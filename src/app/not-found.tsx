import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

function notFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="space-y-4 pb-4">
          <div className="bg-primary/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
            <Search className="text-primary h-12 w-12" />
          </div>
          <CardTitle className="text-primary text-4xl font-bold">404</CardTitle>
          <p className="text-muted-foreground text-xl">الصفحة غير موجودة</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها إلى موقع آخر.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default notFound;
