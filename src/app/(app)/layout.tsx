import { AppHeader } from "@/components/layout/app-header";
import { Footer } from "@/components/layout/footer";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Se ha eliminado la validación de sesión para permitir el acceso libre.
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
