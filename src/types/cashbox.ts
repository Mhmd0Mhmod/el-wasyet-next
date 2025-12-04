export interface CashboxDetails {
  id: number;
  cashBalance: number;
  creditBalance: number;
  totalBalance: number;
  transactionList: CashboxTransaction[];
}
export interface CashboxTransaction {
  id: number;
  amountCash: number;
  amountCredit: number;
  totalAmount: number;
  transactionDate: string;
  description: string;
  type: string;
  orderID: number;
  servicetype: string;
}
