"use client";
import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useWatch } from "react-hook-form";
type AcceptAskExpenseFormInputs = {
  cash: string;
  credit: string;
};
function AcceptAskExpenseDialog({
  open,
  setOpen,
  requestId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestId: number;
}) {
  const { acceptAskExpenseRequest, items } = useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);
  const form = useForm<AcceptAskExpenseFormInputs>({
    defaultValues: {
      cash: "",
      credit: "",
    },
  });
  const askCash = useWatch({ control: form.control, name: "cash" });
  const askCredit = useWatch({ control: form.control, name: "credit" });

  if (!item) return null;
  function onSubmit(data: AcceptAskExpenseFormInputs) {
    const cashAmount = parseFloat(data.cash) || 0;
    const creditAmount = parseFloat(data.credit) || 0;
    acceptAskExpenseRequest(requestId, cashAmount, creditAmount);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:text-right">
          <DialogTitle>قبول طلب تحصيل</DialogTitle>
          <DialogDescription>
            أدخل مبالغ النقد والآجل للطلب رقم {requestId}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="cash" className="text-right">
            كاش
          </Label>
          <Input
            id="cash"
            type="number"
            step="any"
            {...form.register("cash")}
            placeholder="أدخل المبلغ كاش..."
          />
          <Label htmlFor="credit" className="text-right">
            كريديت
          </Label>
          <Input
            id="credit"
            type="number"
            step="any"
            {...form.register("credit")}
            placeholder="أدخل مبلغ كريديت..."
          />
          <DialogFooter>
            <Button disabled={askCash.trim() === "" && askCredit.trim() === ""}>
              قبول طلب التحصيل
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AcceptAskExpenseDialog;
