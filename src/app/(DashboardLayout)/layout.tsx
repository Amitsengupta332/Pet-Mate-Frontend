import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getUser } from "@/services/auth";

export default async function DashboardLayout({
  admin,
  owner,
  sitter,
  children,
}: {
  admin: React.ReactNode;
  owner: React.ReactNode;
  sitter: React.ReactNode;
  children: React.ReactNode;
}) {
  // 1. Await the server action
  const user = await getUser(); 
  const role = user?.role?.toLowerCase();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        {/* 2. Render the specific parallel slot based on user role */}
        <div className="flex-1 p-6">
          {role === "admin" && admin}
          {role === "sitter" && sitter}
          {role === "owner" && owner}
          {!role && children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}