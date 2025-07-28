import { AppSidebar } from "@/components/layout/app-sidebar";
import { Footer } from "@/components/layout/footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
