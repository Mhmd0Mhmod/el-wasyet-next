import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AsideBar from "./aside-bar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SidebarProvider>
        <AsideBar />
        <SidebarInset className="px-8">{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
export default layout;
