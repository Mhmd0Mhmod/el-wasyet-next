import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";

interface expenseParams {
  fromDate?: string;
  toDate?: string;
  page?: string;
}

export async function getExpenses({
  fromDate,
  toDate,
  page,
}: expenseParams): Promise<PaginatedResponse<Expense>> {
  try {
    const { data } = await authFetch.get<PaginatedResponse<Expense>>(
      "/Expense/all",
      {
        params: {
          fromDate,
          toDate,
          pageNumber: page,
          pageSize: defaults.pageSize,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
}
