import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

interface DiscountItem {
  id: number;
  companyName: string;
  percentage: number;
}

interface DiscountsCardProps {
  discounts: DiscountItem[];
  total: number;
}

function DiscountsCard({ discounts, total }: DiscountsCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <TrendingDown className="h-4 w-4 text-blue-600" />
          </div>
          الخصومات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center justify-between"
            >
              <span className="text-gray-600">{discount.companyName}</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-blue-600">
                  {discount.percentage}
                </span>
                <span className="text-sm text-blue-500">%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Discounts */}
        <div className="rounded-lg bg-blue-50 p-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-blue-900">إجمالي الخصومات</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-blue-900">{total}</span>
              <span className="text-sm text-blue-700">%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DiscountsCard;
