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
        <div className="flex flex-col flex-1">
          <SidebarInset>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
          <Footer appLayout />
        </div>
      </div>
    </SidebarProvider>
  );
}
