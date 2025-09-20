import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Layout/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchClient } from "@/lib/fetch";
import { ShortBranch } from "@/types/branch";
async function Page() {
  const { data: branches } =
    await fetchClient.get<ShortBranch[]>("Auth/branches");

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md flex-col space-y-6 border bg-gray-100 p-8">
        <CardHeader className="flex flex-col items-center">
          <Logo />
          <CardTitle className="mt-4 text-2xl font-bold">
            مرحباً بعودتك
          </CardTitle>
          <CardDescription>
            قم بتسجيل الدخول إلي حسابك في الوسيط
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm branches={branches} />
        </CardContent>
      </Card>
    </div>
  );
}
export default Page;
