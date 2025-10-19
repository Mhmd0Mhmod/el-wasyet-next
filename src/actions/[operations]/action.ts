"use server";

import { Operation } from "@/components/providers/OperationsProvider";
import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { getCurrentUser } from "../auth/actions";
import { getOperationEndpoint } from "./helpler";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

// Types for better type safety
type OperationResult = {
  orderId: number;
  success?: boolean;
  error?: string;
};

type SubmitActionsParams = {
  operations: Operation[];
  pathname: string;
};

export async function sendCode(orderId: number): Promise<APIResponse<null>> {
  try {
    const user = await getCurrentUser();
    if (!user?.user.userId) {
      return {
        success: false,
        message:
          "لم يتم العثور على المستخدم الحالي. يرجى تسجيل الدخول مرة أخرى.",
      };
    }

    const { data } = await authFetch.post("OperationLog/send-receipt-code", {
      orderId,
      employeeId: user.user.id,
    });
    console.log(data);

    return data.success
      ? { success: true, data: null }
      : { success: false, message: data.message || "حدث خطأ ما" };
  } catch (err) {
    return handleErrorResponse(err);
  }
}
async function processOperation(
  operation: Operation,
  endpoint: string,
  employeeId: string,
): Promise<OperationResult> {
  try {
    const { data } = await authFetch.post(endpoint, {
      ...operation,
      employeeId,
    });

    return data.success
      ? { orderId: operation.orderId, success: true }
      : { orderId: operation.orderId, error: data.message || "حدث خطأ ما" };
  } catch (error) {
    if (error instanceof AxiosError) {
      let message = error.response?.data?.message;
      const errors = Object.values(error.response?.data.errors || {});
      if (errors.length > 0) {
        message = errors.join(" ");
      } else {
        message = error.response?.data.message || error.message;
      }
      return {
        orderId: operation.orderId,
        error: message || "حدث خطأ ما",
      };
    }

    return { orderId: operation.orderId, error: "حدث خطأ ما" };
  }
}
function generateResultMessage(
  results: OperationResult[],
  totalOperations: number,
): APIResponse<null> {
  const successfulOps = results.filter((r) => r.success);
  const failedOps = results.filter((r) => r.error);
  console.log(failedOps);

  if (failedOps.length === 0) {
    return { success: true, data: null };
  }
  if (successfulOps.length > 0) {
    const failedOrderIds = failedOps.map((f) => `طلب ${f.orderId}`).join(", ");
    return {
      success: false,
      message: ` تم تنفيذ ${successfulOps.length} من ${totalOperations} بنجاح. فشل في تنفيذ: ${failedOrderIds} `,
    };
  }
  return {
    success: false,
    message: failedOps.map((f) => `طلب ${f.orderId}: ${f.error}`).join(" \n"),
  };
}

export async function submitActions(
  params: SubmitActionsParams,
): Promise<APIResponse<null>> {
  try {
    const { operations, pathname } = params;
    const user = await getCurrentUser();
    const employeeId = user?.user.userId;

    if (!employeeId) {
      return {
        success: false,
        message:
          "لم يتم العثور على المستخدم الحالي. يرجى تسجيل الدخول مرة أخرى.",
      };
    }
    const endpoint = getOperationEndpoint(pathname);
    const results = await Promise.all(
      operations.map((operation) =>
        processOperation(operation, endpoint, employeeId),
      ),
    );
    revalidatePath(pathname);
    return generateResultMessage(results, operations.length);
  } catch (err) {
    return handleErrorResponse(err);
  }
}
