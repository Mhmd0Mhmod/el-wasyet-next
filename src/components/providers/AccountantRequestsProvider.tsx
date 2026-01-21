"use client";
import { submitAccountantRequest } from "@/actions/dashboard/actions";
import { AccountantRequestItem } from "@/lib/api/accountant-requests";
import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type ExtendedAccountantRequestItem = AccountantRequestItem &
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
  acceptAskExpenseRequest: (
    requestId: number,
    { cash, credit }: { cash: number; credit: number },
  ) => void;
  clearRequestAction: (requestId: number) => void;
  clearAllActions: () => void;
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
    { cash, credit }: { cash: number; credit: number },
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
    setAskExpenseItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
    setRejectedItems((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
  };

  const clearAllActions = () => {
    setAcceptedItems([]);
    setAskExpenseItems([]);
    setRejectedItems([]);
  };

  const resetActions = () => {
    setAcceptedItems([]);
    setRejectedItems([]);
    setAskExpenseItems([]);
  };
  const submitActions = async () => {
    try {
      const filterItems = items.filter((item) => item.action !== "none");
      const responses = await submitAccountantRequest(filterItems);
      responses.forEach((response) => {
        if (response.success) {
          toast.success(response.message || "تم حفظ الإجراء بنجاح");
        } else {
          toast.error(response.message || "حدث خطأ أثناء حفظ الإجراء");
        }
      });
      resetActions();
    } catch {
      toast.error("حدث خطأ أثناء حفظ الإجراءات");
    }
  };
  const isActionsPending =
    acceptedItems.length > 0 ||
    rejectedItems.length > 0 ||
    askExpenseItems.length > 0;

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
        clearAllActions,
        submitActions,
        acceptAskExpenseRequest,
      }}
    >
      {children}
      {isActionsPending && (
        <div className="mr-auto w-fit space-x-4">
          <Button onClick={resetActions} variant={"outline"}>
            مسح الإجراءات
          </Button>
          <Button onClick={submitActions}>حفظ الإجراءات</Button>
        </div>
      )}
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

function AcceptAllRequests() {
  const { items, acceptRequest, clearAllActions } = useAccountantRequests();
  const isChecked = items.every((item) => item.action === "accept");
  function handleClick() {
    if (!isChecked) {
      items.forEach((item) => {
        if (item.requestStatusName !== "Pending") return;
        acceptRequest(item.requestId);
      });
    } else {
      clearAllActions();
    }
  }
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={isChecked} onCheckedChange={handleClick} />
      <Label>قبول الجميع</Label>
    </div>
  );
}

function AcceptAllAskExpenseActionWithCash() {
  const { items, acceptAskExpenseRequest, clearAllActions } =
    useAccountantRequests();
  const isChecked = items.every(
    (item) => item.action === "askExpense" && item.cash === item.amount,
  );
  function handleClick() {
    if (!isChecked)
      items.forEach((item) => {
        if (item.requestStatusName !== "Pending") return;
        acceptAskExpenseRequest(item.requestId, {
          cash: item.amount,
          credit: 0,
        });
      });
    else clearAllActions();
  }
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={isChecked} onCheckedChange={handleClick} />
      <Label>قبول كاش</Label>
    </div>
  );
}
function AcceptAllAskExpenseActionWithCredit() {
  const { items, acceptAskExpenseRequest, clearAllActions } =
    useAccountantRequests();
  const isChecked = items.every(
    (item) => item.action === "askExpense" && item.credit === item.amount,
  );
  function handleClick() {
    if (!isChecked)
      items.forEach((item) => {
        if (item.requestStatusName !== "Pending") return;
        acceptAskExpenseRequest(item.requestId, {
          cash: 0,
          credit: item.amount,
        });
      });
    else clearAllActions();
  }
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={isChecked} onCheckedChange={handleClick} />
      <Label>قبول كريديت</Label>
    </div>
  );
}
export default AccountantRequestsProvider;
export {
  AcceptAllAskExpenseActionWithCash,
  AcceptAllAskExpenseActionWithCredit,
  AcceptAllRequests,
};
