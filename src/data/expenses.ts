import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";

interface expenseParams {
  date?: string;
  page?: string;
}

export async function getExpenses({
  date,
  page,
} : expenseParams ): Promise<PaginatedResponse<Expense>> {
  try {
    const { data } =
      await authFetch.get<PaginatedResponse<Expense>>("/Expense/all",{
        params:{
          date,
          pageNumber:page,
          pageSize : defaults.pageSize
        }
      });
    return (
      data
    );
  } catch (error) {
    throw error;
  }
}
