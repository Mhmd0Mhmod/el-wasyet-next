import { authFetch } from "@/lib/axios";
import { OfferDetails } from "@/types/offer";
import { Offer } from "@/types/order";

export async function getDiscounts(): Promise<Offer[]> {
  try {
    const { data } = await authFetch.get<Offer[]>("Offer/getall");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getDiscountById({
  id,
  startDate,
  endDate,
}: {
  id: number;
  startDate?: string;
  endDate?: string;
}): Promise<OfferDetails> {
  try {
    const { data } = await authFetch.get<OfferDetails>(`Offer/details/${id}`, {
      params: {
        startDate,
        endDate,
      },
    });
    return data || null;
  } catch (error) {
    throw error;
  }
}
