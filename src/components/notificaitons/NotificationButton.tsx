import { NotificationsProvider } from "@/components/providers/NotficationsProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon } from "lucide-react";
import NotificationSheetContent from "./NotificationSheetContent";
function NotificationButton() {
  return (
    <NotificationsProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <BellIcon />
          </Button>
        </SheetTrigger>
        <SheetContent dir="rtl" className="w-full sm:max-w-md">
          <NotificationSheetContent />
        </SheetContent>
      </Sheet>
    </NotificationsProvider>
  );
}

export default NotificationButton;
