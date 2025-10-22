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
