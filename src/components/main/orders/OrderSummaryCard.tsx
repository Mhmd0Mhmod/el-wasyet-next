import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, getOrderStatusColor } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { OrderDetails } from "@/types/order";

interface OrderSummaryCardProps {
  orderDetails: OrderDetails;
}

function OrderSummaryCard({ orderDetails }: OrderSummaryCardProps) {
  return (
    <Card className="w-full shadow-sm" dir="rtl">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-bold sm:text-lg">
              {orderDetails.orderCode}
            </h3>
            <span className="text-sm text-gray-600 sm:text-base">
              رقم الأمر
            </span>
          </div>
          <Badge className={cn(getOrderStatusColor(orderDetails.orderStatus))}>
            {orderDetails.orderStatus}
          </Badge>
        </div>

        <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 sm:text-sm">اسم الفرع</div>
            <div className="text-sm font-semibold text-gray-900 sm:text-base">
              {orderDetails.branchName}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 sm:text-sm">نوع الخدمة</div>
            <div className="text-sm font-semibold text-gray-900 sm:text-base">
              {orderDetails.serviceName}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 sm:text-sm">
              تاريخ الإنشاء
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-base">
              {formatDate(orderDetails.createdDate, "datetime")}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 sm:text-sm">
              تم إنشاؤه بواسطة
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-base">
              {orderDetails.createdBy}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummaryCard;
