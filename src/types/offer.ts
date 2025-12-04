interface OfferDetails {
  transactions: transaction[];
  sumOfDiscounts: number;
}
type transaction = {
  id: number;
  offerId: number;
  orderId: number;
  ordercode: string | null;
  discountAmount: number;
  transactionDate: string;
};

export type { OfferDetails };
