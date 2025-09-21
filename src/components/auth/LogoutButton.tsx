"use client";
import { Logout } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    Logout().then(() => {
      router.refresh();
      toast.success("تم تسجيل الخروج بنجاح");
    });
  };
  return (
    <Button variant={"ghost"} className="text-primary" onClick={handleLogout}>
      تسجيل الخروج
    </Button>
  );
}
export default LogoutButton;
