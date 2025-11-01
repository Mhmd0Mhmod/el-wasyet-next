import { authFetch } from "@/lib/axios";
import { DashboardData, MonthlyPerformancePoint } from "@/types/dashboard";
import { OrderByStatusDetail } from "@/types/order";

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

export async function getRequestStatusData(): Promise<BasicEntity[]> {
  try {
    const response = await authFetch.get<BasicEntity[]>(
      "ActivityReport/RequestTypes",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching request status data:", error);
    throw error;
  }
}

export async function getOrdersByStatusDetails(
  statusId: number,
  dates: { fromDate?: string; toDate?: string },
  pageNumber?: number,
): Promise<PaginatedResponse<OrderByStatusDetail>> {
  try {
    const response = await authFetch.get<
      PaginatedResponse<OrderByStatusDetail>
    >(`CompanyDashboard/orders-by-status/${statusId}`, {
      params: {
        ...dates,
        pageNumber: pageNumber,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching orders by status details:", error);
    throw error;
  }
}
