"use server";
import { ExtendedAccountantRequestItem } from "@/components/providers/AccountantRequestsProvider";
import { AccountantRequestsAPI } from "@/lib/api/accountant-requests";
import { revalidatePath } from "next/cache";
export async function submitAccountantRequest(
  items: ExtendedAccountantRequestItem[],
) {
  try {
    const acceptedItemsRequests = items.filter(
      (item) => item.action !== "none" && item.action !== "reject",
    );
    const rejectedItems = items.filter((item) => item.action === "reject");
    const responses = await Promise.all([
      AccountantRequestsAPI.submitAccountantRequestAcceptances(
        acceptedItemsRequests,
      ),
      AccountantRequestsAPI.submitAccountantRequestRejections(rejectedItems),
    ]);
    return responses;
  } catch {
    throw new Error("Failed to submit accountant requests");
  } finally {
    revalidatePath("/accountant-requests");
  }
}
