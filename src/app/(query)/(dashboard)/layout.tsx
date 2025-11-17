import DashboardHeader from "@/components/(dashboard)/layout/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AsideBar from "../../../components/(dashboard)/layout/aside-bar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AsideBar />
      <SidebarInset className="px-8">
        <DashboardHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
