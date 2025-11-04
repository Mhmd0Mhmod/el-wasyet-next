import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/helper";
import { OrderDetails } from "@/types/order";

interface OrderDetailsCardProps {
  orderDetails: OrderDetails;
}

function OrderDetailsCard({ orderDetails }: OrderDetailsCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2" dir="rtl">
      {/* بيانات العميل - Client Data */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">بيانات العميل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 text-sm text-gray-500">رقم التليفون</div>
            <div className="text-lg font-semibold">
              {orderDetails.clientPhoneNumber}
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-500">اسم العميل</div>
            <div className="text-lg font-semibold">
              {orderDetails.clientName}
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-500">عنوان التسليم</div>
            <div className="text-lg font-semibold">
              {orderDetails.deliveryAddress}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التفاصيل المالية - Financial Details */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">التفاصيل المالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* القيمة الكلية - Total Value */}
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
            <span className="text-primary font-semibold">القيمة الكلية</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(orderDetails.amount)}
              </span>
            </div>
          </div>

          {/* المصاريف - Expenses */}
          <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
            <span className="font-semibold text-red-900">المصاريف</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-900">
                {formatCurrency(orderDetails.expenses)}
              </span>
            </div>
          </div>

          {/* صافي الربح - Net Profit */}
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
            <span className="font-semibold text-green-900">صافي الربح</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-900">
                {formatCurrency(orderDetails.netAmount)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* طرق التحصيل - Collection Methods */}
          <div>
            <h4 className="mb-3 font-semibold text-gray-700">طرق التحصيل</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">كاش</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatCurrency(orderDetails.cash)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">كريديت</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatCurrency(orderDetails.credit)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderDetailsCard;
