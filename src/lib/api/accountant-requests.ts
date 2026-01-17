import { authFetch } from "../axios";

export type AccountantRequestsParams = {
  fromDate?: string;
  toDate?: string;
  employeeid?: string;
  accountantid?: string;
};
export interface AccountantRequest {
  requests: AccountantRequestItem[];
  totalCash: number;
  totalCredit: number;
  totalAmount: number;
  totalExpenses: number;
  netAmount: number;
}
export interface AccountantRequestItem {
  requestId: number;
  requestDate: string;
  requestType: number;
  amount: number;
  amountInCash: number;
  amountInCredit: number;
  requestStatusName: string;
  requestTypeName: string;
  fromEmployeeName: string;
  toEmployeeName: string;
}
export interface Employee {
  id: number;
  name: string;
}
export enum RequestType {
  AskExpense = "طلب تحصيل مصاريف",
  RefundExpense = "طلب رد مصاريف",
  CashTransfer = "طلب تحويل نقدي",
  RefundOrder = "طلب مرتجع",
  CancelOrderWithoutForms = "طلب الغاء",
  CancelOrderWithForms = "طلب الغاء باستماره",
}
export class AccountantRequestsAPI {
  static async fetchAccountantRequests(
    params: AccountantRequestsParams,
  ): Promise<PaginatedResponse<AccountantRequest>> {
    try {
      const { data } = await authFetch.get<
        PaginatedResponse<AccountantRequest>
      >("/Request/AccountantRequests", {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getEmployees(): Promise<Employee[]> {
    try {
      const { data } = await authFetch.get<Employee[]>(
        "/Request/employees/without-accountants",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getAccountants(): Promise<Employee[]> {
    try {
      const { data } = await authFetch.get<Employee[]>(
        "/Request/GetAccoutantEmployees",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
