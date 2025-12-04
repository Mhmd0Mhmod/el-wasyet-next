"use client";

import { convertMonthToArabic, formatCurrency } from "@/lib/helper";
import { MonthlyPerformancePoint } from "@/types/dashboard";
import { memo } from "react";
import type { TooltipProps } from "recharts";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

type ChartTooltipProps = TooltipProps<ValueType, NameType> & {
  payload?: Payload<ValueType, NameType>[];
  label?: string | number;
};
const ChartTooltip = memo(function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border bg-white/95 p-3 text-sm shadow-md">
      <p className="font-semibold">{label}</p>
      <ul className="mt-2 space-y-1">
        {payload.map((entry, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {formatCurrency(Number(entry.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

function MonthPerformanceChart({ data }: { data: MonthlyPerformancePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 16, right: 16, bottom: 12 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
        <XAxis
          dataKey="monthName"
          tickFormatter={(value) => convertMonthToArabic(String(value))}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tickLine={false}
          axisLine={false}
          width={90}
        />
        <Tooltip content={<ChartTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => (
            <span className="text-muted-foreground text-sm font-medium">
              {value}
            </span>
          )}
        />
        <Line
          type="monotone"
          dataKey="netProfit"
          name="صافي الربح"
          stroke="#1d4ed8"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="totalExpenses"
          name="المصروفات"
          stroke="#dc2626"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="totalIncome"
          name="الإيرادات"
          stroke="#15803d"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default MonthPerformanceChart;
