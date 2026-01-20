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
  requestId: number;
  requestItem: ExtendedAccountantRequestItem;
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
    throw new Error(
      `Request item with id ${requestId} not found in AccountantRequestsProvider`,
    );
  }
  return (
    <AccountantRequest.Provider value={{ requestId, requestItem }}>
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
  const { requestId, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "accept";
  function handleChange() {
    if (!isChecked) acceptRequest(requestId);
    else clearRequestAction(requestId);
  }
  return <Checkbox checked={isChecked} onCheckedChange={handleChange} />;
}
function RejectRequestAction() {
  const [open, setOpen] = useState(false);
  const { clearRequestAction } = useAccountantRequests();
  const { requestId, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "reject";
  function handleChange() {
    if (!isChecked) setOpen(true);
    else clearRequestAction(requestId);
  }
  return (
    <>
      <Checkbox checked={isChecked} onCheckedChange={handleChange} />
      <RejectRequestDialog
        open={open}
        setOpen={setOpen}
        requestId={requestId}
      />
    </>
  );
}
function PartialAcceptRequestAction() {
  const [open, setOpen] = useState(false);
  const { clearRequestAction } = useAccountantRequests();
  const { requestId, requestItem } = useAccountantRequest();
  const isChecked = requestItem.action === "partial";
  function handleChange() {
    if (!isChecked) setOpen(true);
    else clearRequestAction(requestId);
  }
  return (
    <>
      <Checkbox checked={isChecked} onCheckedChange={handleChange} />
      <PartialAcceptDialog
        open={open}
        setOpen={setOpen}
        requestId={requestId}
      />
    </>
  );
}
function AcceptWithCreditRequestAction() {
  const { acceptAskExpenseRequest, clearRequestAction } =
    useAccountantRequests();
  const { requestId, requestItem } = useAccountantRequest();
  const isChecked =
    requestItem.action === "askExpense" && requestItem.cash === 0;
  function handleChange() {
    if (!isChecked)
      acceptAskExpenseRequest(requestId, {
        cash: 0,
        credit: requestItem.amount,
      });
    else {
      clearRequestAction(requestId);
    }
  }
  return <Checkbox checked={isChecked} onCheckedChange={handleChange} />;
}
function AcceptWithCashRequestAction() {
  const { acceptAskExpenseRequest, clearRequestAction } =
    useAccountantRequests();
  const { requestId, requestItem } = useAccountantRequest();
  const isChecked =
    requestItem.action === "askExpense" && requestItem.credit === 0;
  function handleChange() {
    if (!isChecked)
      acceptAskExpenseRequest(requestId, {
        cash: requestItem.amount,
        credit: 0,
      });
    else {
      clearRequestAction(requestId);
    }
  }
  return <Checkbox checked={isChecked} onCheckedChange={handleChange} />;
}
export {
  AcceptRequestAction,
  AcceptWithCashRequestAction,
  AcceptWithCreditRequestAction,
  PartialAcceptRequestAction,
  RejectRequestAction,
};
export default AccountRequestActions;
