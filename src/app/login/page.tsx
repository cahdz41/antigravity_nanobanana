"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const supabase = createClient();

        if (!supabase) {
            setError("El servicio no está configurado correctamente");
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        router.push(redirectTo);
        router.refresh();
    };

    return (
        <Card variant="glass" className="w-full max-w-md relative">
            <CardHeader className="text-center">
                {/* Logo */}
                <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                        <svg
                            className="w-6 h-6 text-white"
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
                </Link>
                <CardTitle className="text-2xl">Bienvenido de nuevo</CardTitle>
                <CardDescription>
                    Inicia sesión en tu cuenta para continuar
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        label="Contraseña"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Iniciar sesión
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            href="/signup"
                            className="text-purple-400 hover:text-purple-300 font-medium"
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function LoginFormFallback() {
    return (
        <Card variant="glass" className="w-full max-w-md relative">
            <CardHeader className="text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-gray-800 animate-pulse" />
                <div className="h-7 w-48 mx-auto bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-5 w-64 mx-auto bg-gray-800 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-11 bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-11 bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-11 bg-gray-800 rounded-xl animate-pulse" />
            </CardContent>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
            </div>

            <Suspense fallback={<LoginFormFallback />}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
