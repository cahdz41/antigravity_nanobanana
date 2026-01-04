import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { triggerN8nWorkflow } from "@/lib/n8n";
import type { CreateJobRequest, CreateJobResponse } from "@/types";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        if (!supabase) {
            return NextResponse.json(
                { error: "Servicio no configurado" },
                { status: 503 }
            );
        }

        // Get current user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        // Parse request body
        const body: CreateJobRequest = await request.json();

        // Validate required fields
        if (!body.personImage || !body.objectImage) {
            return NextResponse.json(
                { error: "Se requieren ambas imágenes (personImage y objectImage)" },
                { status: 400 }
            );
        }

        // Create job in database with status pending
        const { data: job, error: insertError } = await supabase
            .from("jobs")
            .insert({
                user_id: user.id,
                status: "pending",
                input: {
                    personImage: body.personImage.substring(0, 100) + "...", // Store truncated for reference
                    objectImage: body.objectImage.substring(0, 100) + "...",
                    prompt: body.prompt,
                },
                attempts: 0,
            })
            .select()
            .single();

        if (insertError || !job) {
            console.error("Error creating job:", insertError);
            return NextResponse.json(
                { error: "Error al crear el trabajo" },
                { status: 500 }
            );
        }

        // Update to running status
        await supabase
            .from("jobs")
            .update({ status: "running", updated_at: new Date().toISOString() })
            .eq("id", job.id);

        // Trigger n8n workflow and WAIT for response (synchronous)
        const n8nResult = await triggerN8nWorkflow({
            job_id: job.id,
            personImage: body.personImage,
            objectImage: body.objectImage,
            prompt: body.prompt,
        });

        if (n8nResult.success && n8nResult.imageBase64) {
            // Update job with successful result
            await supabase
                .from("jobs")
                .update({
                    status: "completed",
                    output: {
                        imageBase64: n8nResult.imageBase64,
                        mimeType: n8nResult.mimeType || "image/png",
                        generatedAt: new Date().toISOString(),
                    },
                    completed_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq("id", job.id);
        } else {
            // Update job with error
            await supabase
                .from("jobs")
                .update({
                    status: "failed",
                    error: {
                        code: "N8N_ERROR",
                        message: n8nResult.error || "Error al generar la imagen",
                        retryable: true,
                    },
                    completed_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq("id", job.id);
        }

        const response: CreateJobResponse = {
            id: job.id,
            status: n8nResult.success ? "completed" : "failed",
            createdAt: job.created_at,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/jobs:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const supabase = await createClient();

        if (!supabase) {
            return NextResponse.json(
                { error: "Servicio no configurado" },
                { status: 503 }
            );
        }

        // Get current user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        // Get user's jobs
        const { data: jobs, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching jobs:", error);
            return NextResponse.json(
                { error: "Error al obtener los trabajos" },
                { status: 500 }
            );
        }

        return NextResponse.json(jobs);
    } catch (error) {
        console.error("Error in GET /api/jobs:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
