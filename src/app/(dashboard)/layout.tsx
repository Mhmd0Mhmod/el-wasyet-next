import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Header from "@/components/Layout/Header";
import AsideBar from "./aside-bar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SidebarProvider>
        <AsideBar />
        <SidebarInset>
          <header className="flex h-16 items-center border-b">
            <Header />
          </header>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
export default layout;
