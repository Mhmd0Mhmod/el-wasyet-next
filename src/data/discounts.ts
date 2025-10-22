import { authFetch } from "@/lib/axios";
import { Offer } from "@/types/order";

export async function getDiscounts(): Promise<Offer[]> {
  try {
    const { data } = await authFetch.get<Offer[]>("Offer/getall");
    return data;
  } catch (error) {
    throw error;
  }
}
