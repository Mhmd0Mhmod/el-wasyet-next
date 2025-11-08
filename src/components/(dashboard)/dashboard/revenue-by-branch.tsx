"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { branchRevenues } from "@/types/dashboard";
import { memo } from "react";
import type { TooltipProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type RevenueByBranchProps = {
  data: branchRevenues[];
  className?: string;
  onViewBranches?: () => void;
};

const ChartTooltip = memo(function ChartTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType> & {
  payload?: Payload<ValueType, NameType>[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border bg-white/95 px-3 py-2 text-xs shadow-sm">
      <p className="text-foreground font-medium">
        {item.payload?.branchName ?? item.name}
      </p>
      <p className="text-muted-foreground">
        {formatCurrency(Number(item.value))}
      </p>
    </div>
  );
});

function RevenueByBranch({ data, className }: RevenueByBranchProps) {
  const chartData = data.map((branch) => ({
    branchName: branch.branchName,
    revenue: branch.revenue,
  }));

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          الإيرادات حسب الفروع
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {chartData.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            لا توجد بيانات متاحة لعرض الإيرادات حسب الفروع.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, bottom: 32 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis
                dataKey="branchName"
                interval={0}
                angle={-25}
                dy={18}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(Number(value))}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`${entry.branchName}-${index}`}
                    fill={index % 2 === 0 ? "#3b82f6" : "#6b7280"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueByBranch;
