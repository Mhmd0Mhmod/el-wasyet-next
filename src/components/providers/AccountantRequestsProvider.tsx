"use client";
import { AccountantRequestItem } from "@/lib/api/accountant-requests";
import { createContext, useContext, useMemo, useState } from "react";

type ExtendedAccountantRequestItem = AccountantRequestItem &
  (
    | {
        action: "accept";
      }
    | {
        action: "reject";
        reason: string;
      }
    | { action: "partial"; partialAcceptAmount: number }
    | {
        action: "askExpense";
        cash: number;
        credit: number;
      }
    | {
        action: "none";
      }
  );

interface AccountantRequestsContextType {
  isAllSelected: boolean;
  items: ExtendedAccountantRequestItem[];
  acceptedItems: { requestId: number; amount?: number }[];
  rejectedItems: { reason: string; requestId: number }[];
  acceptRequest: (requestId: number, amount?: number) => void;
  rejectRequest: (requestId: number, reason: string) => void;
  acceptAskExpenseRequest?: (
    requestId: number,
    cash: number,
    credit: number,
  ) => void;
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
  const [askExpenseItems, setAskExpenseItems] = useState<
    { requestId: number; cash: number; credit: number }[]
  >([]);

  const items: ExtendedAccountantRequestItem[] = useMemo(() => {
    return data.map((item) => {
      const acceptedItem = acceptedItems.find(
        (a) => a.requestId === item.requestId,
      );
      if (acceptedItem) {
        if (acceptedItem.amount !== undefined) {
          return {
            ...item,
            action: "partial",
            partialAcceptAmount: acceptedItem.amount,
          };
        }
        return { ...item, action: "accept" };
      }
      const rejectedItem = rejectedItems.find(
        (r) => r.requestId === item.requestId,
      );
      if (rejectedItem) {
        return { ...item, action: "reject", reason: rejectedItem.reason };
      }
      const askExpenseItem = askExpenseItems.find(
        (a) => a.requestId === item.requestId,
      );
      if (askExpenseItem) {
        return {
          ...item,
          action: "askExpense",
          cash: askExpenseItem.cash,
          credit: askExpenseItem.credit,
        };
      }
      return { ...item, action: "none" };
    });
  }, [data, acceptedItems, rejectedItems, askExpenseItems]);

  const isAllSelected = items.every((item) => item.action === "accept");

  const acceptRequest = (requestId: number, amount?: number) => {
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
  const acceptAskExpenseRequest = (
    requestId: number,
    cash: number,
    credit: number,
  ) => {
    const findExisting = askExpenseItems.find((a) => a.requestId === requestId);
    if (findExisting) {
      // Update amounts if already exists
      setAskExpenseItems((prev) =>
        prev.map((a) =>
          a.requestId === requestId ? { ...a, cash, credit } : a,
        ),
      );
      return;
    }
    setAskExpenseItems((prev) => [...prev, { requestId, cash, credit }]);
    setAcceptedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
    setRejectedItems((prev) =>
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
        acceptRequest,
        rejectRequest,
        clearRequestAction,
        toggleSelectAll,
        submitActions,
        acceptAskExpenseRequest,
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
