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
import { formatCurrency } from "@/lib/helper";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

function AccountRequestActions({ requestId }: { requestId: number }) {
  const { accceptRequest, rejectRequest, clearRequestAction, items } =
    useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [partialDialogOpen, setPartialDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState(item?.reason || "");
  const [partialAmount, setPartialAmount] = useState(
    item?.partialAcceptAmount?.toString() || "",
  );

  const handleAccept = () => {
    accceptRequest(requestId);
  };

  const handleReject = () => {
    rejectRequest(requestId, rejectReason);
    setRejectReason("");
    setRejectDialogOpen(false);
  };

  const handlePartialAccept = () => {
    const amount = parseFloat(partialAmount);
    if (!isNaN(amount) && amount > 0) {
      accceptRequest(requestId, amount);
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
  if (item?.isAccepted || item?.isRejected || item?.isPartiallyAccepted) {
    ACCOUNTANT_REQUEST_ACTIONS.unshift({
      label: "مسح الإجراء",
      action: () => clearRequestAction(requestId),
    });
  }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={
            item?.isAccepted ||
            item?.isRejected ||
            item?.isPartiallyAccepted ||
            false
          }
          disabled
        />
        <h4>
          {item?.isAccepted
            ? "مقبول"
            : item?.isRejected
              ? "مرفوض"
              : item?.isPartiallyAccepted
                ? `مقبول جزئيًا - ${formatCurrency(item.partialAcceptAmount || 0)}`
                : "لم يتم اتخاذ إجراء"}
        </h4>
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
        onOpenChange={() => {
          setRejectDialogOpen(!rejectDialogOpen);
          setRejectReason(item?.reason || "");
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
        onOpenChange={() => {
          setPartialDialogOpen(!partialDialogOpen);
          setPartialAmount(item?.partialAcceptAmount?.toString() || "");
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
    </div>
  );
}
export default AccountRequestActions;
