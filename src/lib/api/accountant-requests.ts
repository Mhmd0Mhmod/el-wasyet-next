import { handleErrorResponse } from "@/actions/helper";
import { authFetch } from "../axios";

export type AccountantRequestsParams = {
  fromDate?: string;
  toDate?: string;
  employeeid?: string;
  accountantid?: string;
  page?: string;
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
  requestTypeName: keyof typeof RequestType;
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
        params: {
          ...params,
          pageNumber: params.page,
        },
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
  static async submitAccountantRequestAcceptances(acceptances: {
    requestId: number;
    amount?: number;
    cash?: number | null;
    credit?: number | null;
  }): Promise<APIResponse<void>> {
    try {
      const response = await authFetch.post(
        `/Request/approve/${acceptances.requestId}`,
        {
          amount: acceptances.amount ?? null,
          cash: acceptances.cash ?? null,
          credit: acceptances.credit ?? null,
        },
      );
      return {
        success: true,
        message: "تم حفظ الإجراء بنجاح",
        data: response.data,
      };
    } catch (error) {
      return handleErrorResponse(error);
    }
  }
  static async submitAccountantRequestRejections(rejections: {
    requestId: number;
    reason: string;
  }): Promise<APIResponse<void>> {
    try {
      console.log(rejections.requestId);

      const response = await authFetch.post(
        `/Request/reject/${rejections.requestId}`,
        rejections.reason,
      );
      return {
        success: true,
        message: "تم حفظ الإجراء بنجاح",
        data: response.data,
      };
    } catch (error) {
      return handleErrorResponse(error);
    }
  }
}
