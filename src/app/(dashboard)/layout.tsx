import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AsideBar from "./aside-bar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SidebarProvider>
        <AsideBar />
        <SidebarInset className="px-8">{children}</SidebarInset>
        <SidebarTrigger className="fixed bottom-4 left-4 z-50 md:hidden" />
      </SidebarProvider>
    </main>
  );
}
export default layout;
