import StatisticsCard from "@/components/(dashboard)/dashboard/statistics-card";
import { DashboardData } from "@/types/dashboard";
import { BanknoteIcon, Package, Users } from "lucide-react";
import { formatCount, formatCurrency } from "@/lib/helper";
function DashboardCards({ data }: { data: DashboardData }) {
  const cards = [
    {
      title: "الأداء المالي الشهري",
      className: "bg-purple-500/20",
      IconComponent: BanknoteIcon,
      header: {
        title: "الايرادات",
        value: formatCurrency(
          data.performanceCard.currentMonthProfit +
            data.performanceCard.currentMonthExpenses,
        ),
      },
      description: [
        {
          title: "المصروفات",
          value: formatCurrency(data.performanceCard.currentMonthExpenses),
        },
        {
          title: "صافي الربح",
          value: formatCurrency(data.performanceCard.currentMonthProfit),
        },
      ],
    },
    {
      title: "الطلبات",
      className: "bg-emerald-500/20",
      IconComponent: Package,
      header: {
        title: "إجمالي الطلبات",
        value: formatCount(data.ordersSummaryCard.totalOrders),
      },
      description: [
        {
          title: "إجمالي الإيرادات",
          value: formatCurrency(data.ordersSummaryCard.totalRevenue),
        },
        {
          title: "متوسط قيمة الطلب",
          value: formatCurrency(data.ordersSummaryCard.averageOrderValue),
        },
      ],
    },
    {
      title: "العملاء والعروض",
      className: "bg-amber-300/20",
      IconComponent: Users,
      header: {
        title: "إجمالي العملاء",
        value: formatCount(data.offersAndCustomersCard.totalClients),
      },
      description: [
        {
          title: "إجمالي الطلبات",
          value: formatCount(data.offersAndCustomersCard.totalOrders),
        },
        {
          title: "الطلبات المعلقة",
          value: formatCount(data.offersAndCustomersCard.pendingOrders),
        },
        {
          title: "عملاء جدد هذا الشهر",
          value: formatCount(data.offersAndCustomersCard.newClientsThisMonth),
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <StatisticsCard key={index} {...card} />
      ))}
    </div>
  );
}
export default DashboardCards;
