"use client";

import { cn, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { JobStatus } from "@/types";

interface JobStatusBadgeProps {
    status: JobStatus;
    size?: "sm" | "md" | "lg";
    showAnimation?: boolean;
}

export function JobStatusBadge({
    status,
    size = "md",
    showAnimation = true,
}: JobStatusBadgeProps) {
    const sizes = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-medium border",
                getStatusColor(status),
                sizes[size]
            )}
        >
            {/* Status indicator dot */}
            <span
                className={cn(
                    "w-2 h-2 rounded-full",
                    status === "pending" && "bg-yellow-400",
                    status === "running" && "bg-blue-400",
                    status === "completed" && "bg-green-400",
                    status === "failed" && "bg-red-400",
                    showAnimation && status === "running" && "animate-pulse"
                )}
            />
            {getStatusLabel(status)}
        </span>
    );
}
