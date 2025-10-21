import { authFetch } from "@/lib/axios";
import { DashboardData, MonthlyPerformancePoint } from "@/types/dashboard";

export async function getDashboardData(params: {
  fromDate?: string;
  toDate?: string;
}): Promise<DashboardData> {
  try {
    const response = await authFetch.get<DashboardData>("CompanyDashboard", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
export async function getMonthPerformanceData(params: {
  fromDate?: string;
  toDate?: string;
}): Promise<MonthlyPerformancePoint[]> {
  try {
    const response = await authFetch.get<MonthlyPerformancePoint[]>(
      "CompanyDashboard/monthly-financial-summary",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching month performance data:", error);
    throw error;
  }
}
