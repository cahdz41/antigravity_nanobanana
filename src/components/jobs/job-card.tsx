"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { JobStatusBadge } from "./job-status";
import { formatRelativeTime } from "@/lib/utils";
import type { Job } from "@/types";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    // Get first image from input for preview
    const previewImage = job.output?.imageUrl || job.output?.imageBase64;
    const hasResult = job.status === "completed" && previewImage;

    return (
        <Link href={`/dashboard/${job.id}`}>
            <Card
                variant="glass"
                className="group hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
            >
                <CardContent className="p-0">
                    <div className="flex gap-4">
                        {/* Preview image */}
                        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-800 overflow-hidden">
                            {hasResult ? (
                                <Image
                                    src={
                                        job.output?.imageUrl ||
                                        `data:${job.output?.mimeType};base64,${job.output?.imageBase64}`
                                    }
                                    alt="Resultado"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    {job.status === "running" ? (
                                        <svg
                                            className="animate-spin h-8 w-8 text-purple-500"
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
                                    ) : job.status === "failed" ? (
                                        <svg
                                            className="h-8 w-8 text-red-500"
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
                                    ) : (
                                        <svg
                                            className="h-8 w-8 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm text-gray-400 truncate max-w-[200px]">
                                        {job.input.prompt || "Sin descripción"}
                                    </p>
                                </div>
                                <JobStatusBadge status={job.status} size="sm" />
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                    {formatRelativeTime(job.created_at)}
                                </span>
                                <svg
                                    className="h-4 w-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
