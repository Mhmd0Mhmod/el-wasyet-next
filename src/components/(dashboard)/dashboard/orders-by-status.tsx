import Dialog from "@/components/general/Dialog";
import { translateToArabic } from "@/components/operation/helper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCount } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { ordersPerStatus } from "@/types/dashboard";
import OrdersByStatusDetails from "./OrdersByStatusDetails";

const STATUS_BAR_COLORS = [
  "bg-primary",
  "bg-amber-400",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-blue-500",
];

type OrdersByStatusProps = {
  data: ordersPerStatus[];
  className?: string;
};

function OrdersByStatus({ data, className }: OrdersByStatusProps) {
  const total = data.reduce((sum, item) => sum + item.ordersCount, 0);

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-muted-foreground text-sm">
            إجمالي {formatCount(total)}
          </span>
          <CardTitle className="text-xl font-semibold">
            الطلبات حسب الحالة
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            لا توجد بيانات لعرض حالة الطلبات.
          </p>
        ) : (
          data.map((item, index) => {
            const percentage = total
              ? Math.round((item.ordersCount / total) * 100)
              : 0;
            return (
              <Dialog key={item.statusName}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{translateToArabic(item.statusName)}</span>
                    <div>
                      <span className="text-muted-foreground">
                        {formatCount(item.ordersCount)}
                      </span>
                      <Dialog.Trigger>
                        <Button variant="link" size="sm">
                          عرض التفاصيل
                        </Button>
                      </Dialog.Trigger>
                    </div>
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
                <Dialog.Content
                  title={`تفاصيل الطلبات - ${translateToArabic(
                    item.statusName,
                  )}`}
                >
                  <OrdersByStatusDetails statusId={item.statusId} />
                </Dialog.Content>
              </Dialog>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

export default OrdersByStatus;
