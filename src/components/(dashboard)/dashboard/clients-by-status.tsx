import { translateToArabic } from "@/components/operation/helper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCount } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { clientsPerStatus } from "@/types/dashboard";

const STATUS_BAR_COLORS = [
  "bg-primary",
  "bg-emerald-500",
  "bg-amber-400",
  "bg-rose-500",
];

type ClientsByStatusProps = {
  data: clientsPerStatus[];
  className?: string;
};

function ClientsByStatus({ data, className }: ClientsByStatusProps) {
  const total = data.reduce((sum, item) => sum + item.clientsCount, 0);

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-muted-foreground text-sm">
            إجمالي {formatCount(total)}
          </span>
          <CardTitle className="text-xl font-semibold">
            العملاء حسب الحالة
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            لا توجد بيانات لعرض حالة العملاء.
          </p>
        ) : (
          data.map((item, index) => {
            const percentage = total
              ? Math.round((item.clientsCount / total) * 100)
              : 0;
            return (
              <div key={item.statusName} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{translateToArabic(item.statusName)}</span>
                  <span className="text-muted-foreground">
                    {formatCount(item.clientsCount)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                    {percentage}%
                  </span>
                  <div className="bg-muted flex-1 overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all",
                        STATUS_BAR_COLORS[index % STATUS_BAR_COLORS.length],
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

export default ClientsByStatus;
