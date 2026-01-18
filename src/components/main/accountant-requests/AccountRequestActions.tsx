"use client";
import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
function translateAction(action?: string | null) {
  switch (action) {
    case "accept":
      return "تم القبول";
    case "reject":
      return "تم الرفض";
    case "partial":
      return "تم القبول جزئياً";
    case "askExpense":
      return "تم قبول طلب التحصيل";
    case "none":
      return "لم يتم اتخاذ إجراء";
    default:
      return null;
  }
}

function AccountRequestActions({ requestId }: { requestId: number }) {
  const {
    acceptRequest,
    rejectRequest,
    clearRequestAction,
    items,
    acceptAskExpenseRequest,
  } = useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [partialDialogOpen, setPartialDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [partialAmount, setPartialAmount] = useState("");
  const [askExpenseDialogOpen, setAskExpenseDialogOpen] = useState(false);
  const [askCash, setAskCash] = useState("");
  const [askCredit, setAskCredit] = useState("");

  const handleAccept = () => {
    acceptRequest(requestId);
  };

  const handleReject = () => {
    rejectRequest(requestId, rejectReason);
    setRejectReason("");
    setRejectDialogOpen(false);
  };

  const handlePartialAccept = () => {
    const amount = parseFloat(partialAmount);
    if (!isNaN(amount) && amount > 0) {
      acceptRequest(requestId, amount);
      setPartialAmount("");
      setPartialDialogOpen(false);
    }
  };

  const ACCOUNTANT_REQUEST_ACTIONS = [
    {
      label: "قبول",
      action: handleAccept,
    },
    {
      label: "رفض",
      action: () => setRejectDialogOpen(true),
    },
    {
      label: "قبول جزئي",
      action: () => setPartialDialogOpen(true),
    },
  ];
  if (item?.action !== "none") {
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "مسح الإجراء",
      action: () => clearRequestAction(requestId),
    });
  }

  console.log(item);
  if (item?.requestType === 1) {
    ACCOUNTANT_REQUEST_ACTIONS.shift();
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "قبول طلب تحصيل",
      action: () => setAskExpenseDialogOpen(true),
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
      <Dialog
        open={rejectDialogOpen}
        onOpenChange={(open) => {
          setRejectDialogOpen(open);
          setRejectReason(
            open && item && item.action === "reject" ? item.reason : "",
          );
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفض الطلب</DialogTitle>
            <DialogDescription>
              أدخل سبب الرفض للطلب رقم {requestId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                السبب
              </Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="col-span-3"
                placeholder="أدخل سبب الرفض..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleReject} disabled={!rejectReason.trim()}>
              رفض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Partial Accept Dialog */}
      <Dialog
        open={partialDialogOpen}
        onOpenChange={(open) => {
          setPartialDialogOpen(open);
          setPartialAmount(
            open && item && item.action === "partial"
              ? item.partialAcceptAmount.toString()
              : "",
          );
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>قبول جزئي</DialogTitle>
            <DialogDescription>
              أدخل المبلغ المقبول جزئيًا للطلب رقم {requestId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                المبلغ
              </Label>
              <Input
                id="amount"
                type="number"
                value={partialAmount}
                onChange={(e) => setPartialAmount(e.target.value)}
                className="col-span-3"
                placeholder="أدخل المبلغ..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handlePartialAccept}
              disabled={!partialAmount || parseFloat(partialAmount) <= 0}
            >
              قبول جزئي
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ask Expense Dialog */}
      <Dialog
        open={askExpenseDialogOpen}
        onOpenChange={(open) => {
          setAskExpenseDialogOpen(open);
          if (open && item && item.action === "askExpense") {
            setAskCash(String(item.cash ?? 0));
            setAskCredit(String(item.credit ?? 0));
          } else if (!open) {
            setAskCash("");
            setAskCredit("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>قبول طلب تحصيل</DialogTitle>
            <DialogDescription>
              أدخل مبالغ النقد والآجل للطلب رقم {requestId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 items-center gap-4 py-4">
            <Label htmlFor="cash" className="text-right">
              كاش
            </Label>
            <Input
              id="cash"
              type="number"
              value={askCash}
              onChange={(e) => setAskCash(e.target.value)}
              className="col-span-3"
              placeholder="أدخل المبلغ كاش..."
            />
            <Label htmlFor="credit" className="text-right">
              كريديت
            </Label>
            <Input
              id="credit"
              type="number"
              value={askCredit}
              onChange={(e) => setAskCredit(e.target.value)}
              className="col-span-3"
              placeholder="أدخل مبلغ كريديت..."
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                const cash = parseFloat(askCash) || 0;
                const credit = parseFloat(askCredit) || 0;
                if (acceptAskExpenseRequest) {
                  acceptAskExpenseRequest(requestId, cash, credit);
                }
                setAskCash("");
                setAskCredit("");
                setAskExpenseDialogOpen(false);
              }}
              disabled={
                (!askCash && !askCredit) ||
                (askCash !== "" && isNaN(parseFloat(askCash))) ||
                (askCredit !== "" && isNaN(parseFloat(askCredit))) ||
                (parseFloat(askCash || "0") <= 0 &&
                  parseFloat(askCredit || "0") <= 0)
              }
            >
              قبول طلب التحصيل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AccountRequestActions;
