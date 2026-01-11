import { getToken } from "@/actions/auth/actions";
import { authFetch } from "@/lib/axios";
import { CashboxDetails } from "@/types/cashbox";

export async function getCashboxData(
  page: string = "1",
): Promise<PaginatedResponse<CashboxDetails>> {
  try {
    const { data } = await authFetch.get<PaginatedResponse<CashboxDetails>>(
      "Cashier/employee/details",
      {
        params: {
          pageNumber: page,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
}

type CashboxSummary = {
  creditBalance: number;
  cashBalance: number;
  comessionAmount: number;
};

export async function getCashierSummary(): Promise<CashboxSummary | null> {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/Cashier/employee/summary`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["cashier-summary"],
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
