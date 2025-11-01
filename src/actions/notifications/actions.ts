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
  notificationId,
  requestId,
  Remainingvalue = null,
}: {
  notificationId: number;
  requestId: number;
  Remainingvalue?: number | null;
}): Promise<APIResponse<void>> {
  try {
    const employeeId = (await getCurrentUser())?.user.userId;
    if (!employeeId) {
      throw new Error("User not authenticated");
    }
    const response = await authFetch.post(
      `/Request/approve/${requestId}`,
      Remainingvalue,
    );
    await markNotificationAsRead(notificationId);
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data.message,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestNotification({
  notificationId,
  requestId,
}: {
  notificationId: number;
  requestId: number;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.post(`/Request/reject/${requestId}`);
    await markNotificationAsRead(notificationId);
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
  notificationId,
}: {
  notificationId: number;
  requestStockId: number;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `RequestStock/ApproveTheRequest/${requestStockId}`,
    );
    await markNotificationAsRead(notificationId);

    revalidateTag("notifications");
    return {
      success: true,
      data: response.data.message,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestStockNotification({
  notificationId,
  requestStockId,
}: {
  notificationId: number;
  requestStockId: number;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `RequestStock/RejectTheRequest/${requestStockId}`,
    );
    await markNotificationAsRead(notificationId);

    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
