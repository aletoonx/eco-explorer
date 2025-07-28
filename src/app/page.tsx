import { Button } from "@/components/ui/button";
import { Leaf, Mountain, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="sr-only">Eco Explorer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/register" prefetch={false}>
              Register
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Discover the Wild with Eco Explorer
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Journey into the heart of nature. Explore wildlife foundations, discover endangered species, and find your own path to conservation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register" prefetch={false}>
                      Start Exploring
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                     <Link href="/login" prefetch={false}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="lush jungle"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Explore, Learn, Protect</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides the tools and information you need to become a modern-day eco explorer.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Mountain className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Visualize wildlife habitats and foundation locations on our dynamic map, with AI-powered insights.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <PawPrint className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Animal Profiles</h3>
                <p className="text-muted-foreground">
                  Detailed profiles of endangered species, highlighting their stories and conservation status.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Leaf className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-headline">Foundation Directory</h3>
                <p className="text-muted-foreground">
                  Connect with wildlife foundations and learn about their crucial conservation efforts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Eco Explorer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
