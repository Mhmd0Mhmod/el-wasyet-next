import ASidebarContent from "@/components/Layout/asidebar-cotent";
import ASidebarHeader from "@/components/Layout/asidebar-header";
import LogoutButton from "@/components/Layout/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
function AsideBar() {
  return (
    <Sidebar side={"right"} collapsible="icon" variant="inset">
      <SidebarHeader className="border-b">
        <ASidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 mb-2 px-2 text-xs font-medium">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ASidebarContent />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="تسجيل الخروج"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogoutButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AsideBar;
