import { handleErrorResponse } from "@/actions/helper";
import { authFetch } from "../axios";
import { revalidatePath } from "next/cache";

export type AccountantRequestsParams = {
  fromDate?: string;
  toDate?: string;
  employeeid?: string;
  accountantid?: string;
  page?: string;
  RequestTypeId?: string;
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
  requestType: RequestTypeId;
  amount: number;
  amountInCash: number;
  amountInCredit: number;
  orderId: number;
  requestStatusName: string;
  requestTypeName: RequestTypeKey;
  fromEmployeeName: string;
  toEmployeeName: string;
}
export const RequestTypes = {
  AskExpense: { id: 1, label: "طلب تحصيل مصاريف" },
  RefundExpense: { id: 2, label: "طلب رد مصاريف" },
  CashTransfer: { id: 3, label: "طلب تحويل نقدي" },
  RefundOrder: { id: 4, label: "طلب مرتجع" },
  CancelOrderWithoutForms: { id: 5, label: "طلب الغاء" },
  CancelOrderWithForms: { id: 6, label: "طلب الغاء باستماره" },
} as const;

export type RequestTypeId =
  (typeof RequestTypes)[keyof typeof RequestTypes]["id"];
export type RequestTypeKey = keyof typeof RequestTypes;
export type RequestTypeLabel =
  (typeof RequestTypes)[keyof typeof RequestTypes]["label"];

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
  static async submitAccountantRequestAcceptances(
    acceptances: {
      requestId: number;
      remainingvalue?: number | null;
      cash?: number | null;
      credit?: number | null;
    }[],
  ): Promise<APIResponse<void>> {
    try {
      const response = await authFetch.post(`/Request/approve`, acceptances);
      revalidatePath("/accountant-requests");
      return {
        success: true,
        message: "تم حفظ الإجراء بنجاح",
        data: response.data,
      };
    } catch (error) {
      return handleErrorResponse(error);
    }
  }
  static async submitAccountantRequestRejections(
    rejections: {
      requestId: number;
      reason: string;
    }[],
  ): Promise<APIResponse<void>> {
    try {
      const response = await authFetch.post(`/Request/reject`, rejections);
      revalidatePath("/accountant-requests");
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
