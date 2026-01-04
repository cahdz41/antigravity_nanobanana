"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";

export function Header() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        if (!supabase) {
            setIsLoading(false);
            return;
        }

        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setIsLoading(false);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        const supabase = createClient();
        if (supabase) {
            await supabase.auth.signOut();
        }
        router.push("/");
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                            <svg
                                className="w-5 h-5 text-white"
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
                        </div>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        NanoBanana Pro
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    {isLoading ? (
                        <div className="w-24 h-9 bg-gray-800 rounded-lg animate-pulse" />
                    ) : user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">
                                    {user.email?.split("@")[0]}
                                </span>
                                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                                    Cerrar sesión
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
