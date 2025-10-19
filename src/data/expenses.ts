import { authFetch } from "@/lib/axios";

export async function getExpenses(): Promise<PaginatedResponse<Expense>> {
  try {
    const { data } =
      await authFetch.get<PaginatedResponse<Expense>>("/Expense/all");
    return (
      data || {
        items: [],
        pageNumber: 0,
        pageSize: 0,
        totalItems: 0,
        totalPages: 0,
      }
    );
  } catch (error) {
    throw error;
  }
}
