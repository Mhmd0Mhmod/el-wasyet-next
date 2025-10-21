import DashboardCards from "@/components/(dashboard)/dashboard/Cards";
import ClientsByStatus from "@/components/(dashboard)/dashboard/clients-by-status";
import FilterSection from "@/components/(dashboard)/dashboard/filter";
import MonthPerformance from "@/components/(dashboard)/dashboard/month-performance";
import OrdersByStatus from "@/components/(dashboard)/dashboard/orders-by-status";
import RevenueByBranch from "@/components/(dashboard)/dashboard/revenue-by-branch";
import RevenueByService from "@/components/(dashboard)/dashboard/revenue-by-service";
import PageLayout from "@/components/Layout/PageLayout";
import { getDashboardData } from "@/data/dashboard";

type Props = {
  searchParams: Promise<{ fromDate?: string; toDate?: string }>;
};
async function page({ searchParams }: Props) {
  const params = await searchParams;
  const dashboardData = await getDashboardData(params);

  return (
    <PageLayout
      title="الصفحه الرئيسيه"
      description="متابعة الأداء العام للنظام"
      className="pb-10"
    >
      <DashboardCards data={dashboardData} />
      <FilterSection />
      <MonthPerformance searchParams={params} />

      <RevenueByService data={dashboardData.revenueByServiceTypes} />
      <RevenueByBranch data={dashboardData.branchRevenues} />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <OrdersByStatus data={dashboardData.ordersPerStatus} />
        <ClientsByStatus data={dashboardData.clientsPerStatus} />
      </div>
    </PageLayout>
  );
}

export default page;
