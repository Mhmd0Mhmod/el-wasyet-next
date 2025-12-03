import DashboardCards from "@/components/(dashboard)/dashboard/Cards";
import ClientsByStatus from "@/components/(dashboard)/dashboard/clients-by-status";
import FilterSection from "@/components/(dashboard)/dashboard/filter";
import MonthPerformance from "@/components/(dashboard)/dashboard/month-performance";
import OrdersByStatus from "@/components/(dashboard)/dashboard/orders-by-status";
import ReportsButton from "@/components/(dashboard)/dashboard/reports-button";
import RevenueByBranch from "@/components/(dashboard)/dashboard/revenue-by-branch";
import RevenueByService from "@/components/(dashboard)/dashboard/revenue-by-service";
import PageLayout from "@/components/Layout/PageLayout";
import { getDashboardData } from "@/data/dashboard";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";

type Props = {
  searchParams: Promise<{ fromDate?: string; toDate?: string }>;
};
async function page({ searchParams }: Props) {
  const params = await searchParams;
  const canView = await checkAccess(ABILITY_IDS.VIEW_DASHBOARD);

  if (!canView) {
    return (
      <PageLayout
        title="الصفحه الرئيسيه"
        description="متابعة الأداء العام للنظام"
        className="pb-10"
      >
        <div className="text-center text-gray-500">
          ليس لديك صلاحية لعرض هذه الصفحة
        </div>
      </PageLayout>
    );
  }

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
      <div className="mt-4 grid gap-4 sm:gap-6 lg:grid-cols-2">
        <OrdersByStatus data={dashboardData.ordersPerStatus} dates={params} />
        <ClientsByStatus data={dashboardData.clientsPerStatus} />
      </div>
      <div className="flex justify-end">
        <ReportsButton />
      </div>
    </PageLayout>
  );
}

export default page;
