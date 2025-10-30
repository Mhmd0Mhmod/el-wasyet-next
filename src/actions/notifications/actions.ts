"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../auth/actions";

export async function markNotificationAsRead(
  notificationId: number,
): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `Notification/${notificationId}/mark-as-read`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function approveRequestNotification({
  requestId,
}: {
  requestId: number;
}): Promise<APIResponse<void>> {
  try {
    const employeeId = (await getCurrentUser())?.user.userId;
    if (!employeeId) {
      throw new Error("User not authenticated");
    }
    const response = await authFetch.patch(
      `Request/approve/${requestId}/by/${employeeId}`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestNotification({
  requestId,
}: {
  requestId: number;
}): Promise<APIResponse<void>> {
  try {
    const employeeId = (await getCurrentUser())?.user.userId;
    if (!employeeId) {
      throw new Error("User not authenticated");
    }
    const response = await authFetch.patch(
      `Request/reject/${requestId}/by/${employeeId}`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function approveRequestStockNotification({
  requestStockId,
}: {
  requestStockId: number;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `RequestStock/ApproveTheRequest/${requestStockId}`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestStockNotification({
  requestStockId,
}: {
  requestStockId: number;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `RequestStock/RejectTheRequest/${requestStockId}`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
