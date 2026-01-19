"use server";
import { ExtendedAccountantRequestItem } from "@/components/providers/AccountantRequestsProvider";
import { AccountantRequestsAPI } from "@/lib/api/accountant-requests";
import { revalidatePath } from "next/cache";
export async function submitAccountantRequest(
  items: ExtendedAccountantRequestItem[],
) {
  try {
    const acceptedItemsRequests = items
      .filter(
        (item) =>
          item.action === "accept" ||
          item.action === "partial" ||
          item.action === "askExpense",
      )
      .map((item) =>
        AccountantRequestsAPI.submitAccountantRequestAcceptances({
          requestId: item.requestId,
          amount:
            item.action === "partial"
              ? item.partialAcceptAmount
              : item.action === "accept"
                ? item.amount
                : undefined,
          cash: item.action === "askExpense" ? item.cash : undefined,
          credit: item.action === "askExpense" ? item.credit : undefined,
        }),
      );
    const rejectedItems = items
      .filter((item) => item.action === "reject")
      .map((item) =>
        AccountantRequestsAPI.submitAccountantRequestRejections({
          requestId: item.requestId,
          reason: item.reason || "",
        }),
      );
    const responses = await Promise.all([
      ...acceptedItemsRequests,
      ...rejectedItems,
    ]);

    return responses;
  } catch {
    throw new Error("Failed to submit accountant requests");
  } finally {
    revalidatePath("/accountant-requests");
  }
}
