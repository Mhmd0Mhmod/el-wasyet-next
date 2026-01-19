"use client";
import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import AcceptAskExpenseDialog from "./AcceptAskExpenseDialog";
import PartialAcceptDialog from "./PartialAcceptDialog";
import RejectRequestDialog from "./RejectRequestDialog";
function translateAction(action?: string | null) {
  switch (action) {
    case "accept":
      return "القبول";
    case "reject":
      return "الرفض";
    case "partial":
      return "القبول جزئياً";
    case "askExpense":
      return "قبول طلب التحصيل";
    case "none":
      return "لم يتم اتخاذ إجراء";
    default:
      return null;
  }
}

function AccountRequestActions({ requestId }: { requestId: number }) {
  const { acceptRequest, clearRequestAction, items } = useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);

  const [dialogType, setDialogType] = useState<
    "reject" | "partial" | "askExpense" | null
  >(null);

  function closeDialog() {
    setDialogType(null);
  }

  const handleAccept = () => {
    acceptRequest(requestId);
  };

  const ACCOUNTANT_REQUEST_ACTIONS = [
    {
      label: "رفض",
      action: () => setDialogType("reject"),
    },
  ];
  if (item?.action !== "none") {
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "مسح الإجراء",
      action: () => clearRequestAction(requestId),
    });
  }
  if (item?.requestType === 1) {
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "قبول طلب تحصيل",
      action: () => setDialogType("askExpense"),
    });
  } else {
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "قبول جزئي",
      action: () => setDialogType("partial"),
    });
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "قبول",
      action: handleAccept,
    });
  }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <Checkbox checked={item?.action !== "none"} disabled />
        <h4>{translateAction(item?.action) || "لم يتم اتخاذ إجراء"}</h4>
      </div>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon-sm"}>
            <MoreVertical size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {ACCOUNTANT_REQUEST_ACTIONS.map((action) => (
              <DropdownMenuItem key={action.label} onSelect={action.action}>
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reject Dialog */}
      <RejectRequestDialog
        open={dialogType === "reject"}
        setOpen={closeDialog}
        requestId={requestId}
      />

      {/* Partial Accept Dialog */}
      <PartialAcceptDialog
        open={dialogType === "partial"}
        setOpen={closeDialog}
        requestId={requestId}
      />

      {/* Ask Expense Dialog */}
      <AcceptAskExpenseDialog
        open={dialogType === "askExpense"}
        setOpen={closeDialog}
        requestId={requestId}
      />
    </div>
  );
}
export default AccountRequestActions;
