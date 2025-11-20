import UserProfileButton from "@/components/Layout/UserProfileButton";
import NotificationButton from "@/components/notificaitons/NotificationButton";
import { SidebarTrigger } from "@/components/ui/sidebar";

function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
      <SidebarTrigger className="h-6 w-6" />
      <div className="flex items-center justify-end gap-2">
        <NotificationButton />
        <UserProfileButton />
      </div>
    </header>
  );
}
export default DashboardHeader;
