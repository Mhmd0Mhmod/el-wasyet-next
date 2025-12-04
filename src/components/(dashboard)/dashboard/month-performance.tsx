import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthPerformanceChart from "./month-performance-chart";
import { getMonthPerformanceData } from "@/data/dashboard";

async function MonthPerformance({
  searchParams,
}: {
  searchParams?: { fromDate?: string; toDate?: string };
}) {
  const data = await getMonthPerformanceData({
    fromDate: searchParams?.fromDate,
    toDate: searchParams?.toDate,
  });
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">
          الأداء الشهري (إيرادات - مصروفات - صافي)
        </CardTitle>
        <CardDescription>
          نظرة عامة على الأداء المالي خلال الأشهر الماضية
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[360px]">
        <MonthPerformanceChart data={data} />
      </CardContent>
    </Card>
  );
}

export default MonthPerformance;
