import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DiscountIncreaseItem {
  id: number;
  companyName: string;
  percentage: number;
}

interface DiscountsIncreasesCardProps {
  increases: DiscountIncreaseItem[];
  discounts: DiscountIncreaseItem[];
  totalIncreases: number;
  totalDiscounts: number;
}

function DiscountsIncreasesCard({
  increases,
  discounts,
  totalIncreases,
  totalDiscounts,
}: DiscountsIncreasesCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">الخصومات والزيادات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* الزيادات - Increases */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <TrendingUp className="h-4 w-4 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-700">الزيادات</h4>
            </div>

            <div className="space-y-3">
              {increases.map((increase) => (
                <div
                  key={increase.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-600">{increase.companyName}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-red-600">
                      {increase.percentage}
                    </span>
                    <span className="text-sm text-red-500">%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Increases */}
            <div className="rounded-lg bg-red-50 p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-red-900">
                  إجمالي الزيادات
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-red-900">
                    {totalIncreases}
                  </span>
                  <span className="text-sm text-red-700">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* الخصومات - Discounts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <TrendingDown className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-700">الخصومات</h4>
            </div>

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
                <span className="text-primary font-semibold">
                  إجمالي الخصومات
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-primary font-bold">
                    {totalDiscounts}
                  </span>
                  <span className="text-sm text-blue-700">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DiscountsIncreasesCard;
