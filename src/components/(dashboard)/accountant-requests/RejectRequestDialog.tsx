"use client";
import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useWatch } from "react-hook-form";
type RejectFormInputs = {
  reason: string;
};
function RejectRequestDialog({
  open,
  setOpen,
  requestId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestId: number;
}) {
  const { rejectRequest, items } = useAccountantRequests();
  const item = items.find((i) => i.requestId === requestId);
  const form = useForm<RejectFormInputs>({
    defaultValues: {
      reason: item?.action === "reject" ? item.reason : "",
    },
  });
  const handleRejectSubmit = async (data: RejectFormInputs) => {
    rejectRequest(requestId, data.reason);
    setOpen(false);
  };

  const reason = useWatch({
    control: form.control,
    name: "reason",
  });
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:text-right">
          <DialogTitle>رفض الطلب</DialogTitle>
          <DialogDescription>
            أدخل سبب الرفض للطلب رقم {requestId}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleRejectSubmit)}>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block font-medium">سبب الرفض</Label>
              <Textarea
                {...form.register("reason", { required: true })}
                className="w-full rounded-md border border-gray-300 p-2"
                rows={4}
              />
            </div>
            <Button
              disabled={reason.trim().length === 0}
              variant={"destructive"}
              type="submit"
              className="mr-auto block w-fit"
            >
              رفض الطلب
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RejectRequestDialog;
