"use client";
import {
  ExtendedAccountantRequestItem,
  useAccountantRequests,
} from "@/components/providers/AccountantRequestsProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { createContext, useContext, useState } from "react";
import PartialAcceptDialog from "./PartialAcceptDialog";
import RejectRequestDialog from "./RejectRequestDialog";

interface AccountantRequestContextType {
  requestItem: ExtendedAccountantRequestItem;
  disabled?: boolean;
}
const AccountantRequest = createContext<AccountantRequestContextType | null>(
  null,
);
function AccountRequestActions({
  requestId,
  children,
}: {
  requestId: number;
  children: React.ReactNode;
}) {
  const { items } = useAccountantRequests();
  const requestItem = items.find((item) => item.requestId === requestId);
  if (!requestItem) {
    return null;
  }
  const disabled = requestItem.requestStatusName !== "Pending";
  return (
    <AccountantRequest.Provider value={{ requestItem, disabled }}>
      {children}
    </AccountantRequest.Provider>
  );
}

function useAccountantRequest() {
  const context = useContext(AccountantRequest);
  if (!context) {
    throw new Error(
      "useAccountantRequest must be used within an AccountRequestActions",
    );
  }
  return context;
}

function AcceptRequestAction() {
  const { acceptRequest, clearRequestAction } = useAccountantRequests();
  const { disabled, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "accept";
  function handleChange() {
    if (!isChecked) acceptRequest(requestItem.requestId);
    else clearRequestAction(requestItem.requestId);
  }
  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={handleChange}
      disabled={disabled}
    />
  );
}
function RejectRequestAction() {
  const [open, setOpen] = useState(false);
  const { clearRequestAction } = useAccountantRequests();
  const { disabled, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "reject";
  function handleChange() {
    if (!isChecked) setOpen(true);
    else clearRequestAction(requestItem.requestId);
  }
  return (
    <>
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
      />
      <RejectRequestDialog
        open={open}
        setOpen={setOpen}
        requestId={requestItem.requestId}
      />
    </>
  );
}
function PartialAcceptRequestAction() {
  const [open, setOpen] = useState(false);
  const { clearRequestAction } = useAccountantRequests();
  const { disabled, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "partial";
  function handleChange() {
    if (!isChecked) setOpen(true);
    else clearRequestAction(requestItem.requestId);
  }
  return (
    <>
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
      />
      <PartialAcceptDialog
        open={open}
        setOpen={setOpen}
        requestId={requestItem.requestId}
      />
    </>
  );
}
function AcceptWithCreditRequestAction() {
  const { acceptAskExpenseRequest, clearRequestAction } =
    useAccountantRequests();
  const { disabled, requestItem } = useAccountantRequest();
  const isChecked =
    requestItem.action === "askExpense" && requestItem.cash === 0;
  function handleChange() {
    if (!isChecked)
      acceptAskExpenseRequest(requestItem.requestId, {
        cash: 0,
        credit: requestItem.amount,
      });
    else {
      clearRequestAction(requestItem.requestId);
    }
  }
  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={handleChange}
      disabled={disabled}
    />
  );
}
function AcceptWithCashRequestAction() {
  const { acceptAskExpenseRequest, clearRequestAction } =
    useAccountantRequests();
  const { disabled, requestItem } = useAccountantRequest();
  const isChecked =
    requestItem.action === "askExpense" && requestItem.credit === 0;
  function handleChange() {
    if (!isChecked)
      acceptAskExpenseRequest(requestItem.requestId, {
        cash: requestItem.amount,
        credit: 0,
      });
    else {
      clearRequestAction(requestItem.requestId);
    }
  }
  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={handleChange}
      disabled={disabled}
    />
  );
}
export {
  AcceptRequestAction,
  AcceptWithCashRequestAction,
  AcceptWithCreditRequestAction,
  PartialAcceptRequestAction,
  RejectRequestAction,
};
export default AccountRequestActions;
