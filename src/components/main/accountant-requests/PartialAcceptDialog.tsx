"use client";
import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm, useWatch } from "react-hook-form";
type PartialAcceptFormInputs = {
  amount: string;
};
function PartialAcceptDialog({
  open,
  setOpen,
  requestId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestId: number;
}) {
  const { acceptRequest, items } = useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);
  const form = useForm<PartialAcceptFormInputs>({
    defaultValues: {
      amount: item?.action === "partial" ? item.amount.toString() : "",
    },
  });
  const onSubmit = async (data: PartialAcceptFormInputs) => {
    acceptRequest(requestId, parseFloat(data.amount));
    setOpen(false);
  };
  const amount = useWatch({
    control: form.control,
    name: "amount",
  });
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:text-right">
          <DialogTitle>قبول جزئي</DialogTitle>
          <DialogDescription>
            أدخل المبلغ المقبول جزئيًا للطلب رقم {requestId}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="amount">المبلغ</Label>
          <Input
            id="amount"
            type="number"
            placeholder="أدخل المبلغ..."
            {...form.register("amount")}
          />
          <DialogFooter>
            <Button type="submit" disabled={amount.trim() === ""}>
              قبول جزئي
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default PartialAcceptDialog;
