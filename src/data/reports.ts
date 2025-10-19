import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";

type ReportPage = PaginatedResponse<Report> & {
  totalExpenses: number;
  totalAmount: number;
  totalNetAmount: number;
};
export async function getReports(params: {
  startDate?: string;
  endDate?: string;
  page?: string;
}): Promise<ReportPage> {
  try {
    const { data } = await authFetch.get<ReportPage>("/Report/DailyReport", {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
        pageNumber: params.page,
        pageSize: defaults.pageSize,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
