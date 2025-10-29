import { getToken } from "@/actions/auth/actions";
import { authFetch } from "@/lib/axios";
import { CashboxDetails } from "@/types/cashbox";

export async function getCashboxData(): Promise<CashboxDetails> {
  try {
    const { data } = await authFetch.get<CashboxDetails>(
      "Cashier/employee/details",
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

export async function getCashierSummary(): Promise<CashboxSummary> {
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
      throw new Error(data.message || "Failed to fetch cashier summary");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
