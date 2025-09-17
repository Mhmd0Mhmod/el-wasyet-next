"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };
  return (
    <Button variant={"ghost"} className="text-primary" onClick={handleLogout}>
      تسجيل الخروج
    </Button>
  );
}
export default LogoutButton;
