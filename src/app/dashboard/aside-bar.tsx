import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function AsideBar() {
  return (
    <Sidebar variant={"inset"} className={"relative"}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
export default AsideBar;
