"use client";
import Dialog from "@/components/shared/Dialog";
import RefundOrderForm from "@/components/main/orders/RefundOrderForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/types/order";
import { MoreVerticalIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  CancelOrderWithForm,
  CancelOrderWithoutForm,
} from "@/actions/reports/actions";
function OrderTableDropDownMenu({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<
    "refund" | "cancelWithForm" | null
  >(null);
  const onCancelWithFormCreditClick = useCallback(async () => {
    const id = toast.loading("جاري إلغاء الطلب...");
    try {
      const response = await CancelOrderWithForm({
        orderId: order.id,
        action: "cancel order",
        isFormPaidByCredit: true,
        isFormPaidInCash: false,
      });
      if (response.success) {
        toast.success("تم إلغاء الطلب بنجاح", { id });
        setOpen(false);
      } else {
        toast.error(response.message || "حدث خطأ أثناء إلغاء الطلب", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء إلغاء الطلب", { id });
    }
  }, [order.id]);
  const onCancelWithFormCashClick = useCallback(async () => {
    const id = toast.loading("جاري إلغاء الطلب...");
    try {
      const response = await CancelOrderWithForm({
        orderId: order.id,
        action: "cancel order",
        isFormPaidByCredit: false,
        isFormPaidInCash: true,
      });
      if (response.success) {
        toast.success("تم إلغاء الطلب بنجاح", { id });
        setOpen(false);
      } else {
        toast.error(response.message || "حدث خطأ أثناء إلغاء الطلب", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء إلغاء الطلب", { id });
    }
  }, [order.id]);
  const onCancelWithoutFormClick = useCallback(async () => {
    const id = toast.loading("جاري إلغاء الطلب...");
    try {
      const response = await CancelOrderWithoutForm({
        orderId: order.id,
        action: "cancel order",
      });
      if (response.success) {
        toast.success("تم إلغاء الطلب بنجاح", { id });
        setOpen(false);
      } else {
        toast.error(response.message || "حدث خطأ أثناء إلغاء الطلب", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء إلغاء الطلب", { id });
    }
  }, [order.id]);
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup dir="rtl">
            <Dialog.Trigger>
              <DropdownMenuItem onClick={() => setCurrentDialog("refund")}>
                مرتجع
              </DropdownMenuItem>
            </Dialog.Trigger>
            <Dialog.Trigger>
              <DropdownMenuItem
                onClick={() => setCurrentDialog("cancelWithForm")}
              >
                إلغاء بالاستمارة
              </DropdownMenuItem>
            </Dialog.Trigger>
            <DropdownMenuItem onClick={onCancelWithoutFormClick}>
              إلغاء بدون استمارة
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {currentDialog === "refund" && (
        <Dialog.Content title="مرتجع" className="sm:max-w-fit">
          <RefundOrderForm orderId={order.id} />
        </Dialog.Content>
      )}
      {currentDialog === "cancelWithForm" && (
        <Dialog.Content title="إلغاء بالاستمارة" className="sm:max-w-fit">
          <div className="grid grid-cols-2 gap-4">
            <h3 className="col-span-2 text-xl font-bold">
              الطريقه التي تم دفع بيها الاستماره
            </h3>
            <Button onClick={onCancelWithFormCreditClick}>كريديت</Button>
            <Button variant={"outline"} onClick={onCancelWithFormCashClick}>
              كاش
            </Button>
          </div>
        </Dialog.Content>
      )}
    </Dialog>
  );
}
export default OrderTableDropDownMenu;
