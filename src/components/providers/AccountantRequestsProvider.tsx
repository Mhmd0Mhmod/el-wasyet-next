"use client";
import { AccountantRequestItem } from "@/lib/api/accountant-requests";
import { createContext, useContext, useState } from "react";

type ExtendedAccountantRequestItem = AccountantRequestItem & {
  isAccepted: boolean;
  isRejected: boolean;
  isPartiallyAccepted: boolean;
  partialAcceptAmount?: number;
  reason?: string;
};

interface AccountantRequestsContextType {
  isAllSelected: boolean;
  items: ExtendedAccountantRequestItem[];
  acceptedItems: { requestId: number; amount?: number }[];
  rejectedItems: { reason: string; requestId: number }[];
  accceptRequest: (requestId: number, amount?: number) => void;
  rejectRequest: (requestId: number, reason: string) => void;
  clearRequestAction: (requestId: number) => void;
  toggleSelectAll: () => void;
  submitActions: () => Promise<void>;
}
const AccountantRequestsContext = createContext<
  AccountantRequestsContextType | undefined
>(undefined);
function AccountantRequestsProvider({
  data,
  children,
}: {
  data: AccountantRequestItem[];
  children: React.ReactNode;
}) {
  const [acceptedItems, setAcceptedItems] = useState<
    { requestId: number; amount?: number }[]
  >([]);
  const [rejectedItems, setRejectedItems] = useState<
    { reason: string; requestId: number }[]
  >([]);

  const items: ExtendedAccountantRequestItem[] = data.map((item) => ({
    ...item,
    isAccepted: acceptedItems.some(
      (a) => a.requestId === item.requestId && a.amount === undefined,
    ),
    isRejected: rejectedItems.some((r) => r.requestId === item.requestId),
    isPartiallyAccepted: acceptedItems.some(
      (p) => p.requestId === item.requestId && p.amount !== undefined,
    ),
    partialAcceptAmount:
      acceptedItems.find((p) => p.requestId === item.requestId)?.amount || 0,
    reason:
      rejectedItems.find((r) => r.requestId === item.requestId)?.reason || "",
  }));

  const isAllSelected = items.every((item) => item.isAccepted);

  const accceptRequest = (requestId: number, amount?: number) => {
    const findExisting = acceptedItems.find((a) => a.requestId === requestId);
    if (findExisting) {
      // Update amount if already accepted
      setAcceptedItems((prev) =>
        prev.map((a) =>
          a.requestId === requestId ? { ...a, amount: amount } : a,
        ),
      );
      return;
    }
    setAcceptedItems((prev) => [...prev, { requestId, amount }]);
    setRejectedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
  };

  const rejectRequest = (requestId: number, reason: string) => {
    const findExisting = rejectedItems.find((r) => r.requestId === requestId);
    if (findExisting) {
      // Update reason if already rejected
      setRejectedItems((prev) =>
        prev.map((r) =>
          r.requestId === requestId ? { ...r, reason: reason } : r,
        ),
      );
      return;
    }
    setRejectedItems((prev) => [...prev, { reason, requestId }]);
    setAcceptedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
  };

  const clearRequestAction = (requestId: number) => {
    setAcceptedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
    setRejectedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setAcceptedItems([]);
      setRejectedItems([]);
    } else {
      setAcceptedItems(data.map((item) => ({ requestId: item.requestId })));
    }
  };

  const submitActions = async () => {
    // TODO: Implement API call to submit actions
  };

  return (
    <AccountantRequestsContext.Provider
      value={{
        isAllSelected,
        items,
        acceptedItems,
        rejectedItems,
        accceptRequest,
        rejectRequest,
        clearRequestAction,
        toggleSelectAll,
        submitActions,
      }}
    >
      {children}
    </AccountantRequestsContext.Provider>
  );
}
export function useAccountantRequests() {
  const context = useContext(AccountantRequestsContext);
  if (context === undefined) {
    throw new Error(
      "useAccountantRequests must be used within an AccountantRequestsProvider",
    );
  }
  return context;
}
export default AccountantRequestsProvider;
