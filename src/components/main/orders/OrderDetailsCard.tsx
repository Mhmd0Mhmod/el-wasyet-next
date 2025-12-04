import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/helper";
import { OrderDetails } from "@/types/order";

interface OrderDetailsCardProps {
  orderDetails: OrderDetails;
}

function OrderDetailsCard({ orderDetails }: OrderDetailsCardProps) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2" dir="rtl">
      {/* بيانات العميل - Client Data */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">بيانات العميل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 text-sm text-gray-500">رقم التليفون</div>
            <div className="text-base font-semibold sm:text-lg">
              {orderDetails.clientPhoneNumber}
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-500">اسم العميل</div>
            <div className="text-base font-semibold sm:text-lg">
              {orderDetails.clientName}
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-500">عنوان التسليم</div>
            <div className="text-base font-semibold sm:text-lg">
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
            <span className="text-primary text-sm font-semibold sm:text-base">
              القيمة الكلية
            </span>
            <div className="flex items-center gap-2">
              <span className="text-primary text-base font-bold sm:text-lg">
                {formatCurrency(orderDetails.amount)}
              </span>
            </div>
          </div>

          {/* المصاريف - Expenses */}
          <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
            <span className="text-sm font-semibold text-red-900 sm:text-base">
              المصاريف
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-red-900 sm:text-lg">
                {formatCurrency(orderDetails.expenses)}
              </span>
            </div>
          </div>

          {/* صافي الربح - Net Profit */}
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
            <span className="text-sm font-semibold text-green-900 sm:text-base">
              صافي الربح
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-green-900 sm:text-lg">
                {formatCurrency(orderDetails.netAmount)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* طرق التحصيل - Collection Methods */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700 sm:text-base">
              طرق التحصيل
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 sm:text-base">كاش</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold sm:text-base">
                    {formatCurrency(orderDetails.cash)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 sm:text-base">
                  كريديت
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold sm:text-base">
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
