import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px]" />
            <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[128px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Potenciado por Google Gemini AI
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Crea anuncios{" "}
                <span className="gradient-text">espectaculares</span>
                <br />
                con inteligencia artificial
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Combina imágenes de personas y productos para generar anuncios
                publicitarios de alta calidad con estética premium y nocturna.
                Sin conocimientos de diseño requeridos.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="min-w-[200px]">
                    <span>Comenzar gratis</span>
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </Link>
                <Link href="#como-funciona">
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    Ver cómo funciona
                  </Button>
                </Link>
              </div>
            </div>

            {/* Demo preview */}
            <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      nanobanana.pro/dashboard
                    </div>
                  </div>
                </div>

                {/* Content preview */}
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Input 1 */}
                    <div className="rounded-xl border-2 border-dashed border-gray-700 bg-gray-800/50 p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Imagen de Persona</p>
                    </div>

                    {/* Input 2 */}
                    <div className="rounded-xl border-2 border-dashed border-gray-700 bg-gray-800/50 p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Imagen de Producto</p>
                    </div>

                    {/* Output */}
                    <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-purple-300 font-medium">Anuncio Generado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="py-24 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                En solo 3 simples pasos, transforma tus imágenes en anuncios
                profesionales de alta calidad.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/30">
                  1
                </div>
                <div className="pt-8 pl-4">
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 h-full">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Sube tus imágenes
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Carga una imagen de la persona o modelo y otra del producto
                      que quieres promocionar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/30">
                  2
                </div>
                <div className="pt-8 pl-4">
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 h-full">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-pink-500/10 flex items-center justify-center">
                      <svg className="w-7 h-7 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Personaliza (opcional)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Añade instrucciones específicas para personalizar el
                      resultado según tus necesidades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/30">
                  3
                </div>
                <div className="pt-8 pl-4">
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 h-full">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Descarga tu anuncio
                    </h3>
                    <p className="text-gray-400 text-sm">
                      La IA genera tu anuncio en segundos. Descárgalo y úsalo
                      donde quieras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-t border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Características Premium
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tecnología de vanguardia para resultados profesionales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: "🎨",
                  title: "Estética Premium",
                  description: "Anuncios con aspecto de campaña de lujo y calidad editorial",
                },
                {
                  icon: "🌙",
                  title: "Iluminación Nocturna",
                  description: "Efectos cinematográficos con iluminación profesional",
                },
                {
                  icon: "🎯",
                  title: "Preservación de Detalles",
                  description: "Mantiene la identidad facial y detalles del producto",
                },
                {
                  icon: "⚡",
                  title: "Generación Rápida",
                  description: "Resultados en segundos gracias a Google Gemini",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500/30 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para crear anuncios increíbles?
              </h2>
              <p className="text-gray-400 mb-8">
                Regístrate ahora y empieza a generar anuncios profesionales con IA
              </p>
              <Link href="/signup">
                <Button size="lg" className="min-w-[250px]">
                  <span>Crear cuenta gratis</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
