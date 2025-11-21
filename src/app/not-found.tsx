import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Home, SearchX, ArrowRight, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";

function notFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 h-72 w-72 animate-pulse rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute -right-8 -bottom-8 h-96 w-96 animate-pulse rounded-full bg-purple-300/20 blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-indigo-300/20 blur-3xl delay-500" />
      </div>

      <Card className="border-primary/20 relative w-full max-w-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Decorative Header Background */}
        <div className="from-primary/5 absolute inset-x-0 top-0 h-48 bg-gradient-to-b to-transparent" />

        <CardHeader className="relative space-y-8 pt-12 pb-8 text-center">
          {/* Animated Icon Container */}
          <div className="relative mx-auto">
            <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full blur-2xl" />
            <div className="from-primary/30 to-primary/10 border-primary/30 shadow-primary/20 relative flex h-32 w-32 items-center justify-center rounded-full border-4 bg-gradient-to-br shadow-lg">
              <SearchX
                className="text-primary h-16 w-16 animate-bounce"
                strokeWidth={2.5}
              />
            </div>
            {/* Floating Sparkles */}
            <Sparkles className="text-primary/60 absolute -top-2 -right-4 h-6 w-6 animate-pulse" />
            <Sparkles className="text-primary/40 absolute -bottom-2 -left-4 h-5 w-5 animate-pulse delay-300" />
          </div>

          <div className="space-y-5">
            {/* Creative 404 Display with Animations */}
            <div className="flex items-center justify-center gap-4">
              <div className="from-primary/20 to-primary/5 text-primary group relative overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-3 text-7xl font-black tabular-nums shadow-lg transition-transform hover:scale-110">
                <div className="from-primary/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">4</span>
              </div>
              <div className="from-primary/20 to-primary/5 text-primary group relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition-transform hover:scale-110 hover:rotate-12">
                <SearchX className="h-12 w-12" strokeWidth={3} />
              </div>
              <div className="from-primary/20 to-primary/5 text-primary group relative overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-3 text-7xl font-black tabular-nums shadow-lg transition-transform hover:scale-110">
                <div className="from-primary/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">4</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight" dir="rtl">
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                الصفحة غير موجودة
              </span>
            </h1>
            <p
              className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed"
              dir="rtl"
            >
              يبدو أنك تائه في الفضاء الرقمي! 🚀 الصفحة التي تبحث عنها غير
              متوفرة أو تم نقلها إلى موقع آخر.
            </p>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4 px-6 pb-6">
          {/* Helpful Tips with Enhanced Design */}
          <div
            className="from-muted/50 to-muted/30 border-primary/10 space-y-4 rounded-xl border bg-gradient-to-br p-6 shadow-sm"
            dir="rtl"
          >
            <div className="flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              <h3 className="font-bold">ماذا يمكنك أن تفعل؟</h3>
            </div>
            <ul className="text-muted-foreground space-y-3 text-sm">
              <li className="group flex items-start gap-3 transition-transform hover:translate-x-1">
                <div className="bg-primary/10 mt-0.5 rounded-full p-1">
                  <ArrowRight className="text-primary h-3.5 w-3.5 flex-shrink-0" />
                </div>
                <span className="leading-relaxed">
                  تحقق من عنوان URL للتأكد من كتابته بشكل صحيح
                </span>
              </li>
              <li className="group flex items-start gap-3 transition-transform hover:translate-x-1">
                <div className="bg-primary/10 mt-0.5 rounded-full p-1">
                  <ArrowRight className="text-primary h-3.5 w-3.5 flex-shrink-0" />
                </div>
                <span className="leading-relaxed">
                  عد إلى الصفحة الرئيسية وابدأ من جديد
                </span>
              </li>
              <li className="group flex items-start gap-3 transition-transform hover:translate-x-1">
                <div className="bg-primary/10 mt-0.5 rounded-full p-1">
                  <ArrowRight className="text-primary h-3.5 w-3.5 flex-shrink-0" />
                </div>
                <span className="leading-relaxed">
                  إذا كنت تعتقد أن هذا خطأ، اتصل بالدعم الفني
                </span>
              </li>
            </ul>
          </div>

          {/* Fun Fact Box */}
          <div
            className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-4 text-center"
            dir="rtl"
          >
            <p className="text-muted-foreground text-xs italic">
              💡 حقيقة ممتعة: خطأ 404 يعني &quot;الصفحة غير موجودة&quot; وهو أحد
              أشهر أكواد الخطأ في الإنترنت!
            </p>
          </div>
        </CardContent>

        <CardFooter className="from-muted/20 to-muted/10 relative flex justify-center border-t bg-gradient-to-b px-6 py-6">
          <Button
            asChild
            size="lg"
            className="group gap-2 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Link href="/">
              <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span dir="rtl">العودة للصفحة الرئيسية</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default notFound;
