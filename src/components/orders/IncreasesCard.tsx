import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface IncreaseItem {
  id: number;
  companyName: string;
  percentage: number;
}

interface IncreasesCardProps {
  increases: IncreaseItem[];
  total: number;
}

function IncreasesCard({ increases, total }: IncreasesCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <TrendingUp className="h-4 w-4 text-red-600" />
          </div>
          الزيادات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <span className="font-semibold text-red-900">إجمالي الزيادات</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-red-900">{total}</span>
              <span className="text-sm text-red-700">%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default IncreasesCard;
