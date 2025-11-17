import UserProfileButton from "@/components/Layout/UserProfileButton";
import { SidebarTrigger } from "@/components/ui/sidebar";

function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
      <SidebarTrigger className="h-6 w-6" />
      <UserProfileButton />
    </header>
  );
}
export default DashboardHeader;
