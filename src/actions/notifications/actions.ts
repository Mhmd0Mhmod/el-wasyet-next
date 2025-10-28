"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { revalidateTag } from "next/cache";

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
