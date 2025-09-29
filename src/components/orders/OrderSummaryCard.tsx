import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { OrderDetails } from "@/types/order";

interface OrderSummaryCardProps {
  orderDetails: OrderDetails;
}

function OrderSummaryCard({ orderDetails }: OrderSummaryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "مكتمل":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "قيد المعالجة":
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ملغي":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "في الانتظار":
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="w-full shadow-sm" dir="rtl">
      <CardContent className="p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-bold">{orderDetails.orderCode}</h3>
            <span>رقم الأمر</span>
          </div>
          <Badge className={cn(getStatusColor(orderDetails.orderStatus))}>
            {orderDetails.orderStatus}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">اسم الفرع</div>
            <div className="font-semibold text-gray-900">
              {orderDetails.clientName}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500">نوع الخدمة</div>
            <div className="font-semibold text-gray-900">
              {orderDetails.serviceName}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500">تاريخ الإنشاء</div>
            <div className="font-semibold text-gray-900">
              {formatDate(orderDetails.createdDate, "datetime")}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500">تم إنشاؤه بواسطة</div>
            <div className="font-semibold text-gray-900">
              {orderDetails.createdBy}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummaryCard;
