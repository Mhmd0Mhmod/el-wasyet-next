"use client";
import { submitAccountantRequest } from "@/actions/dashboard/actions";
import { AccountantRequestItem } from "@/lib/api/accountant-requests";
import { createContext, useContext, useState, useTransition } from "react";
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
    | { action: "partial"; remainingvalue: number }
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
  items: ExtendedAccountantRequestItem[];
  rejectRequest: (requestId: number, reason: string) => void;
  clearRequestAction: (requestId: number) => void;
  clearAllActions: () => void;
  submitActions: () => Promise<void>;
  acceptAskExpenseRequest: (
    requestId: number,
    data: { cash: number; credit: number },
  ) => void;
  acceptRequest: (requestId: number) => void;
  partialAcceptRequest: (requestId: number, remainingvalue: number) => void;
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
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<ExtendedAccountantRequestItem[]>(
    data.map((item) => ({ ...item, action: "none" })),
  );
  const acceptRequest = (requestId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.requestId === requestId ? { ...item, action: "accept" } : item,
      ),
    );
  };
  const partialAcceptRequest = (requestId: number, remainingvalue: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.requestId === requestId
          ? { ...item, action: "partial", remainingvalue }
          : item,
      ),
    );
  };
  const acceptAskExpenseRequest = (
    requestId: number,
    { cash, credit }: { cash: number; credit: number },
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.requestId === requestId
          ? { ...item, action: "askExpense", cash, credit }
          : item,
      ),
    );
  };
  const rejectRequest = (requestId: number, reason: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.requestId === requestId
          ? { ...item, action: "reject", reason }
          : item,
      ),
    );
  };
  const clearRequestAction = (requestId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.requestId === requestId ? { ...item, action: "none" } : item,
      ),
    );
  };
  const clearAllActions = () => {
    setItems((prev) => prev.map((item) => ({ ...item, action: "none" })));
  };

  const submitActions = async () => {
    startTransition(async () => {
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
        clearAllActions();
      } catch {
        toast.error("حدث خطأ أثناء حفظ الإجراءات");
      }
    });
  };
  const isActionsPending = items.some((item) => item.action !== "none");

  return (
    <AccountantRequestsContext.Provider
      value={{
        items,
        rejectRequest,
        clearRequestAction,
        clearAllActions,
        submitActions,
        acceptAskExpenseRequest,
        acceptRequest,
        partialAcceptRequest,
      }}
    >
      {children}
      {isActionsPending && (
        <div className="mr-auto w-fit space-x-4">
          <Button
            disabled={isPending}
            onClick={clearAllActions}
            variant={"outline"}
          >
            مسح الإجراءات
          </Button>
          <Button disabled={isPending} onClick={submitActions}>
            حفظ الإجراءات
          </Button>
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
