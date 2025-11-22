"use client";
import { NotificationsProvider } from "@/components/providers/NotficationsProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BellIcon } from "lucide-react";
import NotificationSheetContent from "./NotificationSheetContent";
import { useState } from "react";
function NotificationButton() {
  const [open, setOpen] = useState(false);
  return (
    <NotificationsProvider open={open}>
      <Sheet open={open} onOpenChange={setOpen}>
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
