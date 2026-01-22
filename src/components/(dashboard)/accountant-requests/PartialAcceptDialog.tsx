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
  remainingvalue: string;
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
  const { partialAcceptRequest, items } = useAccountantRequests();

  const item = items.find((i) => i.requestId === requestId);
  const form = useForm<PartialAcceptFormInputs>({
    defaultValues: {
      remainingvalue: item?.action === "partial" ? item.amount.toString() : "",
    },
  });
  const onSubmit = async (data: PartialAcceptFormInputs) => {
    partialAcceptRequest(requestId, parseFloat(data.remainingvalue));
    setOpen(false);
  };
  const remainingvalue = useWatch({
    control: form.control,
    name: "remainingvalue",
  });
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:text-right">
          <DialogTitle>قبول جزئي</DialogTitle>
          <DialogDescription>
            أدخل المبلغ المتبقي للموظف علي الطلب رقم {item.requestId}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="amount">المبلغ</Label>
          <Input
            id="amount"
            type="number"
            placeholder="أدخل المبلغ..."
            step={"any"}
            {...form.register("remainingvalue")}
          />
          <DialogFooter>
            <Button type="submit" disabled={remainingvalue.trim() === ""}>
              قبول جزئي
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default PartialAcceptDialog;
