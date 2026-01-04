import { createClient } from "@/lib/supabase/server";
import { JobForm } from "@/components/forms/job-form";
import { JobCard } from "@/components/jobs/job-card";
import type { Job } from "@/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
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
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get user's jobs
    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

    const userJobs = (jobs as Job[]) || [];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Hola, {user.user_metadata?.full_name?.split(" ")[0] || "Usuario"} 👋
                </h1>
                <p className="text-gray-400">
                    Crea anuncios personalizados combinando imágenes con IA
                </p>
            </div>

            {/* Create new job form */}
            <section className="mb-12">
                <JobForm />
            </section>

            {/* Jobs history */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Historial de anuncios</h2>
                    {userJobs.length > 0 && (
                        <span className="text-sm text-gray-500">
                            {userJobs.length} {userJobs.length === 1 ? "anuncio" : "anuncios"}
                        </span>
                    )}
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                        Error al cargar los anuncios: {error.message}
                    </div>
                )}

                {userJobs.length === 0 && !error ? (
                    <div className="text-center py-16 rounded-2xl border border-gray-800 bg-gray-900/50">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-300 mb-2">
                            No tienes anuncios todavía
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Sube tus primeras imágenes arriba para crear un anuncio
                            personalizado con IA
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {userJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
