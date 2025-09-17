import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Layout/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function Page() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-8 space-y-6 flex-col bg-gray-100 border">
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
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
export default Page;
