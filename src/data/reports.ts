import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";

type ReportPage = PaginatedResponse<{
  records: Report[];
  totalExpenses: number;
  totalAmount: number;
  totalNetAmount: number;
  totalCredit: number;
  totalCash: number;
}>;
export async function getDailyReports(params: {
  startDate?: string;
  endDate?: string;
  page?: string;
}): Promise<ReportPage> {
  try {
    const { data } = await authFetch.get<ReportPage>("/Report/AdvancedReport", {
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
type ExecutiveReportPage = PaginatedResponse<{
  records: ExecutiveReport[];
  totalExpenses: number;
  totalAmount: number;
  totalNetAmount: number;
}>;
export async function getExcutiveReport(params: {
  startDate?: string;
  endDate?: string;
  page?: string;
}): Promise<ExecutiveReportPage> {
  try {
    const { data } = await authFetch.get<ExecutiveReportPage>(
      "/Report/ExcutiveReport",
      {
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
          pageNumber: params.page,
          pageSize: defaults.pageSize,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getAdvancedDailyReport(params: {
  startDate?: string;
  endDate?: string;
  page?: string;
  branchId?: string;
  employeeId?: string;
}): Promise<ReportPage> {
  try {
    const { data } = await authFetch.get<ReportPage>("/Report/DailyReport", {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
        pageNumber: params.page,
        pageSize: defaults.pageSize,
        branchId: params.branchId,
        employeeId: params.employeeId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
