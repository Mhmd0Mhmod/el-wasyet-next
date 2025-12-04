import { ShieldX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function UnauthorizedPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <ShieldX className="text-destructive h-10 w-10" />
          </div>
          <CardTitle className="text-2xl">غير مصرح لك بالدخول</CardTitle>
          <CardDescription className="text-base">
            ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert>
            <ShieldX className="h-4 w-4" />
            <AlertTitle>تم رفض الوصول</AlertTitle>
            <AlertDescription>
              يرجى التواصل مع مسؤول النظام إذا كنت تعتقد أن لديك الصلاحيات
              المناسبة.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/">الذهاب للصفحة الرئيسية</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UnauthorizedPage;
