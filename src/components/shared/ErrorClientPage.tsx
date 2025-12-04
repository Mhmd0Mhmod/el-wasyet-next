import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RefreshCw, XCircle } from "lucide-react";

function ErrorClientPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="via-background flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="border-destructive/20 w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-6 pt-10 pb-8 text-center">
          <div className="relative mx-auto">
            <div className="bg-destructive/10 absolute inset-0 animate-pulse rounded-full blur-xl" />
            <div className="bg-destructive/20 relative flex h-24 w-24 items-center justify-center rounded-full">
              <XCircle
                className="text-destructive h-14 w-14"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight" dir="rtl">
              عذراً! حدث خطأ غير متوقع
            </h1>
            <p className="text-muted-foreground text-lg" dir="rtl">
              واجهنا مشكلة أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-6">
          <Alert
            variant="destructive"
            className="border-destructive/30 bg-destructive/5"
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-base font-semibold" dir="rtl">
              تفاصيل الخطأ
            </AlertTitle>
            <AlertDescription className="mt-3" dir="rtl">
              <code className="bg-destructive/10 border-destructive/20 block rounded-md border p-3 text-sm leading-relaxed">
                {error.message || "حدث خطأ غير معروف"}
              </code>
              {error.digest && (
                <p className="text-muted-foreground mt-2 text-xs">
                  معرّف الخطأ: {error.digest}
                </p>
              )}
            </AlertDescription>
          </Alert>

          <div className="bg-muted/50 rounded-lg border p-4" dir="rtl">
            <h3 className="mb-2 font-medium">ماذا يمكنك أن تفعل؟</h3>
            <ul className="text-muted-foreground space-y-1.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                حاول تحديث الصفحة
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                تحقق من اتصال الإنترنت لديك
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                إذا استمرت المشكلة، اتصل بالدعم الفني
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/20 flex flex-col gap-3 border-t px-6 py-5 sm:flex-row">
          <Button
            onClick={reset}
            className={cn("h-11 flex-1 gap-2 text-base font-medium")}
            size="lg"
          >
            <RefreshCw className="h-5 w-5" />
            <span dir="rtl">إعادة المحاولة</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className={cn("h-11 flex-1 gap-2 text-base font-medium")}
            size="lg"
          >
            <Home className="h-5 w-5" />
            <span dir="rtl">العودة للرئيسية</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default ErrorClientPage;
