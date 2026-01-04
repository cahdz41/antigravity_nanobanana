export function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-950">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
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
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-400">
                            NanoBanana Pro
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} NanoBanana Pro. Todos los derechos
                        reservados.
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">
                            Términos
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Privacidad
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Contacto
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
