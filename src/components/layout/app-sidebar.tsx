"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Leaf, Map, PawPrint, Landmark, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the session cookie
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold font-headline">Eco Explorer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip="Dashboard">
              <Link href="/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/map')} tooltip="Interactive Map">
              <Link href="/map"><Map /><span>Interactive Map</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/animals')} tooltip="Animals">
               <Link href="/animals"><PawPrint /><span>Animals</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/foundations')} tooltip="Foundations">
               <Link href="/foundations"><Landmark /><span>Foundations</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                    <LogOut/><span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
