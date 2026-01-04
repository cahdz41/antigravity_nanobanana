"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobStatusBadge } from "@/components/jobs/job-status";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import type { Job } from "@/types";

interface JobDetailClientProps {
    initialJob: Job;
}

export function JobDetailClient({ initialJob }: JobDetailClientProps) {
    const router = useRouter();
    const [job, setJob] = useState<Job>(initialJob);
    const [isPolling, setIsPolling] = useState(
        initialJob.status === "pending" || initialJob.status === "running"
    );

    // Polling for job status updates
    const fetchJobStatus = useCallback(async () => {
        try {
            const response = await fetch(`/api/jobs/${job.id}`);
            if (response.ok) {
                const data = await response.json();
                setJob(data);

                // Stop polling if job is completed or failed
                if (data.status === "completed" || data.status === "failed") {
                    setIsPolling(false);
                }
            }
        } catch (error) {
            console.error("Error fetching job status:", error);
        }
    }, [job.id]);

    useEffect(() => {
        if (!isPolling) return;

        const interval = setInterval(fetchJobStatus, 3000);
        return () => clearInterval(interval);
    }, [isPolling, fetchJobStatus]);

    const hasResult = job.status === "completed" && (job.output?.imageUrl || job.output?.imageBase64);
    const resultImageSrc = job.output?.imageUrl ||
        (job.output?.imageBase64 ? `data:${job.output?.mimeType};base64,${job.output?.imageBase64}` : null);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back button */}
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Volver al dashboard
            </Link>

            {/* Status header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-white">
                            Detalle del anuncio
                        </h1>
                        <JobStatusBadge status={job.status} />
                    </div>
                    <p className="text-gray-400 text-sm">
                        Creado {formatRelativeTime(job.created_at)}
                    </p>
                </div>

                {isPolling && (
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Actualizando estado...
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Result section */}
                <Card variant="gradient" className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Resultado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {job.status === "pending" && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-yellow-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    En cola
                                </h3>
                                <p className="text-gray-400 max-w-md">
                                    Tu solicitud está en cola y pronto comenzará a procesarse.
                                </p>
                            </div>
                        )}

                        {job.status === "running" && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-8 w-8 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    Generando anuncio...
                                </h3>
                                <p className="text-gray-400 max-w-md">
                                    La IA está procesando tus imágenes. Esto puede tardar unos segundos.
                                </p>
                            </div>
                        )}

                        {job.status === "failed" && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    Error en la generación
                                </h3>
                                <p className="text-gray-400 max-w-md mb-4">
                                    {job.error?.message || "Ocurrió un error al procesar tu solicitud."}
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Intentar de nuevo
                                </Button>
                            </div>
                        )}

                        {hasResult && resultImageSrc && (
                            <div className="space-y-4">
                                <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-gray-800">
                                    <Image
                                        src={resultImageSrc}
                                        alt="Anuncio generado"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1"
                                        onClick={() => {
                                            if (resultImageSrc) {
                                                const link = document.createElement("a");
                                                link.href = resultImageSrc;
                                                link.download = `anuncio-${job.id}.png`;
                                                link.click();
                                            }
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                        Descargar imagen
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        Crear otro
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Job info */}
                <Card variant="glass">
                    <CardHeader>
                        <CardTitle className="text-lg">Información</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">ID del trabajo</p>
                            <p className="text-sm text-gray-300 font-mono">{job.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Fecha de creación</p>
                            <p className="text-sm text-gray-300">{formatDate(job.created_at)}</p>
                        </div>
                        {job.completed_at && (
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Fecha de finalización</p>
                                <p className="text-sm text-gray-300">{formatDate(job.completed_at)}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Intentos</p>
                            <p className="text-sm text-gray-300">{job.attempts}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Prompt info */}
                <Card variant="glass">
                    <CardHeader>
                        <CardTitle className="text-lg">Prompt personalizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {job.input.prompt ? (
                            <p className="text-sm text-gray-300">{job.input.prompt}</p>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                No se especificó un prompt personalizado
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
