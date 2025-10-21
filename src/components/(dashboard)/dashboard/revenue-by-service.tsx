import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { revenueByServiceTypes } from "@/types/dashboard";

const BAR_COLORS = [
  "bg-primary",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-emerald-500",
];

type RevenueByServiceProps = {
  data: revenueByServiceTypes[];
};

function RevenueByService({ data }: RevenueByServiceProps) {
  const maxRevenue = Math.max(0, ...data.map((item) => item.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          الإيرادات حسب نوع الخدمة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            لا توجد بيانات متاحة لعرض الإيرادات حسب نوع الخدمة.
          </p>
        ) : (
          data.map((item, index) => {
            const width = maxRevenue
              ? Math.max((item.revenue / maxRevenue) * 100, 8)
              : 8;
            return (
              <div key={item.serviceTypeName} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{item.serviceTypeName}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
                <div className="bg-muted h-2 rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      BAR_COLORS[index % BAR_COLORS.length],
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueByService;
