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
}: expenseParams): Promise<
  PaginatedResponse<Expense> & { totalAmount: number }
> {
  try {
    const { data } = await authFetch.get<
      PaginatedResponse<Expense> & {
        totalAmount: number;
      }
    >("/Expense/all", {
      params: {
        fromDate,
        toDate,
        pageNumber: page,
        pageSize: defaults.pageSize,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
