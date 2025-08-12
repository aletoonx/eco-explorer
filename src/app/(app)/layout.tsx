
import { AppHeader } from "@/components/layout/app-header";
import { Footer } from "@/components/layout/footer";

// Ya no necesitamos lógica de cliente aquí (useEffect, useRouter, etc.)
// El middleware se encarga de la protección de rutas en el servidor.

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
