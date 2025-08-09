import { Button } from "@/components/ui/button";
import { Leaf, Mountain, PawPrint } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="sr-only">Eco Explorer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
           <Button variant="outline" asChild>
                <Link href="/login">Iniciar Sesión</Link>
           </Button>
           <Button asChild>
            <Link href="/register" prefetch={false}>
              Registrarse
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
                  Descubre la Naturaleza con Eco Explorer
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Adéntrate en el corazón de la naturaleza. Explora fundaciones de vida silvestre, descubre especies en peligro y encuentra tu propio camino hacia la conservación.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 <Button size="lg" asChild>
                    <Link href="/register">Comienza a Explorar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestras Características</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Explora, Aprende, Protege</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma te proporciona las herramientas y la información que necesitas para convertirte en un eco explorador moderno.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Mountain className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Mapa Interactivo</h3>
                <p className="text-muted-foreground">
                  Visualiza hábitats de vida silvestre y ubicaciones de fundaciones en nuestro mapa dinámico, con información impulsada por IA.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <PawPrint className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Perfiles de Animales</h3>
                <p className="text-muted-foreground">
                  Perfiles detallados de especies en peligro de extinción, destacando sus historias y estado de conservación.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Leaf className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Directorio de Fundaciones</h3>
                <p className="text-muted-foreground">
                  Conéctate con fundaciones de vida silvestre y aprende sobre sus cruciales esfuerzos de conservación.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
