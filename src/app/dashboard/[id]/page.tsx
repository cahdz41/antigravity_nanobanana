import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { JobDetailClient } from "./job-detail-client";
import type { Job } from "@/types";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    if (!supabase) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold text-white mb-2">Servicio no disponible</h1>
                    <p className="text-gray-400">Por favor, configura las variables de entorno de Supabase.</p>
                </div>
            </div>
        );
    }

    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get job by id and ensure it belongs to the user
    const { data: job, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error || !job) {
        notFound();
    }

    return <JobDetailClient initialJob={job as Job} />;
}
