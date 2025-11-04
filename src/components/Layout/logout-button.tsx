"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logout } from "@/actions/auth/actions";

function LogoutButton() {
  function handleLogout() {
    Logout();
  }
  return (
    <Button
      variant={"ghost"}
      className="w-full justify-start gap-3 text-red-400"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4 flex-shrink-0" />
      <span className="group-data-[collapsible=icon]:hidden">تسجيل الخروج</span>
    </Button>
  );
}
export default LogoutButton;
