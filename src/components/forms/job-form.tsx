"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fileToBase64 } from "@/lib/utils";

interface ImageUploadState {
    file: File | null;
    preview: string | null;
    base64: string | null;
}

export function JobForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");

    const [personImage, setPersonImage] = useState<ImageUploadState>({
        file: null,
        preview: null,
        base64: null,
    });

    const [objectImage, setObjectImage] = useState<ImageUploadState>({
        file: null,
        preview: null,
        base64: null,
    });

    const handleImageDrop = useCallback(
        async (
            e: React.DragEvent<HTMLDivElement>,
            setter: React.Dispatch<React.SetStateAction<ImageUploadState>>
        ) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
                const base64 = await fileToBase64(file);
                setter({
                    file,
                    preview: URL.createObjectURL(file),
                    base64,
                });
            }
        },
        []
    );

    const handleImageSelect = useCallback(
        async (
            e: React.ChangeEvent<HTMLInputElement>,
            setter: React.Dispatch<React.SetStateAction<ImageUploadState>>
        ) => {
            const file = e.target.files?.[0];
            if (file && file.type.startsWith("image/")) {
                const base64 = await fileToBase64(file);
                setter({
                    file,
                    preview: URL.createObjectURL(file),
                    base64,
                });
            }
        },
        []
    );

    const clearImage = (
        setter: React.Dispatch<React.SetStateAction<ImageUploadState>>
    ) => {
        setter({ file: null, preview: null, base64: null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!personImage.base64 || !objectImage.base64) {
            setError("Por favor, sube ambas imágenes antes de continuar.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    personImage: personImage.base64,
                    objectImage: objectImage.base64,
                    prompt: prompt || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al crear el trabajo");
            }

            // Redirect to job detail page
            router.push(`/dashboard/${data.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setIsSubmitting(false);
        }
    };

    const ImageDropzone = ({
        label,
        description,
        image,
        setImage,
    }: {
        label: string;
        description: string;
        image: ImageUploadState;
        setImage: React.Dispatch<React.SetStateAction<ImageUploadState>>;
    }) => (
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleImageDrop(e, setImage)}
                className={`
          relative h-48 rounded-xl border-2 border-dashed transition-all duration-200
          ${image.preview
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800/30"
                    }
        `}
            >
                {image.preview ? (
                    <div className="relative w-full h-full">
                        <img
                            src={image.preview}
                            alt={label}
                            className="w-full h-full object-contain rounded-lg p-2"
                        />
                        <button
                            type="button"
                            onClick={() => clearImage(setImage)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                        >
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <svg
                            className="w-10 h-10 text-gray-500 mb-3"
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
                        <p className="text-sm text-gray-400 text-center px-4">
                            {description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Arrastra o haz clic para subir
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageSelect(e, setImage)}
                            className="hidden"
                        />
                    </label>
                )}
            </div>
        </div>
    );

    return (
        <Card variant="gradient" className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
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
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </span>
                    Crear Nuevo Anuncio
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image upload section */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <ImageDropzone
                            label="Imagen de Persona"
                            description="Sube la imagen del personaje o modelo"
                            image={personImage}
                            setImage={setPersonImage}
                        />
                        <ImageDropzone
                            label="Imagen de Producto"
                            description="Sube la imagen del producto a promocionar"
                            image={objectImage}
                            setImage={setObjectImage}
                        />
                    </div>

                    {/* Prompt section */}
                    <Textarea
                        label="Instrucciones adicionales (opcional)"
                        placeholder="Describe cómo quieres que sea el anuncio final. Por ejemplo: 'Quiero que el producto esté en primer plano con el personaje de fondo en una escena nocturna elegante'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        helperText="El sistema ya tiene un prompt base optimizado. Añade instrucciones específicas si lo deseas."
                    />

                    {/* Error message */}
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                        disabled={!personImage.base64 || !objectImage.base64}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        Generar Anuncio
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
