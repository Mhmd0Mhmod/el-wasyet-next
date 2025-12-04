"use client";
import { Logout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    const id = toast.loading("جاري تسجيل الخروج...");
    try {
      await Logout();
      toast.success("تم تسجيل الخروج بنجاح.", { id });
      router.refresh();
    } catch {
      toast.error("حدث خطأ ما أثناء تسجيل الخروج.", { id });
    }
  }, [router]);
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
