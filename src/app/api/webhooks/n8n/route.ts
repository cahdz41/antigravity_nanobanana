import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateN8nSignature } from "@/lib/n8n";
import type { N8nCallbackRequest } from "@/types";

export async function POST(request: Request) {
    try {
        const body: N8nCallbackRequest = await request.json();
        const signature = request.headers.get("x-n8n-signature");

        // Validate signature
        if (!validateN8nSignature(body, signature)) {
            console.warn("Invalid n8n signature");
            return NextResponse.json(
                { error: "Firma inválida" },
                { status: 401 }
            );
        }

        // Validate required fields
        if (!body.job_id || !body.status) {
            return NextResponse.json(
                { error: "Faltan campos requeridos" },
                { status: 400 }
            );
        }

        let supabase;
        try {
            supabase = createAdminClient();
        } catch {
            return NextResponse.json(
                { error: "Servicio no configurado" },
                { status: 503 }
            );
        }

        // Check if job exists and is in a valid state for update
        const { data: existingJob, error: fetchError } = await supabase
            .from("jobs")
            .select("id, status")
            .eq("id", body.job_id)
            .single();

        if (fetchError || !existingJob) {
            return NextResponse.json(
                { error: "Trabajo no encontrado" },
                { status: 404 }
            );
        }

        // Idempotency check: if already completed or failed, don't update
        if (existingJob.status === "completed" || existingJob.status === "failed") {
            return NextResponse.json({
                success: true,
                message: "Trabajo ya procesado previamente",
            });
        }

        // Prepare update data
        const updateData: Record<string, unknown> = {
            status: body.status,
            updated_at: new Date().toISOString(),
        };

        if (body.status === "completed" && body.output) {
            updateData.output = {
                imageBase64: body.output.imageBase64,
                mimeType: body.output.mimeType || "image/png",
                generatedAt: body.timestamp || new Date().toISOString(),
            };
            updateData.completed_at = new Date().toISOString();
        }

        if (body.status === "failed" && body.error) {
            updateData.error = {
                code: body.error.code || "UNKNOWN_ERROR",
                message: body.error.message || "Error desconocido",
                details: body.error.details,
                retryable: true,
            };
            updateData.completed_at = new Date().toISOString();
        }

        // Update job
        const { error: updateError } = await supabase
            .from("jobs")
            .update(updateData)
            .eq("id", body.job_id);

        if (updateError) {
            console.error("Error updating job:", updateError);
            return NextResponse.json(
                { error: "Error al actualizar el trabajo" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Trabajo actualizado correctamente",
        });
    } catch (error) {
        console.error("Error in POST /api/webhooks/n8n:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
