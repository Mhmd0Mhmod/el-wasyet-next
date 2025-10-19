import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AsideBar from "@/app/(RootLayout)/dashboard/aside-bar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider dir={"rtl"}>
      <AsideBar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
