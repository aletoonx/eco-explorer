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
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
        <Footer appLayout />
      </div>
    </SidebarProvider>
  );
}
