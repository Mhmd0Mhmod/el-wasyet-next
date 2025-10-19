"use client";
import { useOperations } from "@/components/providers/OperationsProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrderActions } from "@/data/orders";
import { OrderActionType, OrderActionSchema } from "@/schema/order-actions";
import { OrderByStatus } from "@/types/order";
import { OrderAction } from "@/types/order-actions";
import { MoreVerticalIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { translateToArabic } from "../helper";

function Actions({ order }: { order: OrderByStatus }) {
  const pathname = usePathname();
  const { operations, addOperation } = useOperations();
  const [dialogAction, setDialogAction] = useState<OrderAction | null>(null);
  const orderActions = getOrderActions({ pathname });
  const operation = operations.find((op) => op.orderId === order.orderId);
  const [currentAction, setCurrentAction] = useState<OrderAction>(
    (operation?.action as OrderAction) || order.orderStatusForAction,
  );
  const form = useForm<OrderActionType>({
    resolver: zodResolver(OrderActionSchema),
    defaultValues: { cashAmount: 0, creditAmount: 0 },
  });

  useLayoutEffect(() => {
    const operation = operations.find((op) => op.orderId === order.orderId);
    if (operation) {
      setCurrentAction(operation.action as OrderAction);
    } else {
      setCurrentAction(order.orderStatusForAction as OrderAction);
    }
  }, [operations, order.orderId, order.orderStatusForAction]);

  const handleAction = (action: OrderAction) => {
    const needsDialog = [OrderAction.REFUND, OrderAction.RETURN].includes(
      action,
    );

    if (needsDialog) {
      setDialogAction(action);
    } else {
      addOperation({ orderId: order.orderId, action, notes: "" });
    }
  };
  const onSubmit = (data: OrderActionType) => {
    const { creditAmount = 0, cashAmount = 0 } = data;
    const totalAmount = creditAmount + cashAmount;

    if (totalAmount <= 0) {
      form.setError("cashAmount", {
        message: "يجب أن يكون المبلغ الإجمالي أكبر من صفر",
      });
      return;
    }

    addOperation({
      orderId: order.orderId,
      action: dialogAction!,
      amount: totalAmount,
      cashAmount,
      creditAmount,
      notes: "",
    });

    closeDialog();
  };
  const closeDialog = () => {
    setDialogAction(null);
    form.reset();
  };

  return (
    <>
      {/* Action Display & Dropdown */}
      <div className="flex min-w-32 items-center justify-between">
        {translateToArabic(currentAction || "")}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="scale-75">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {orderActions.length > 0 ? (
              orderActions.map((action) => (
                <DropdownMenuItem
                  key={action}
                  className="cursor-pointer"
                  onClick={() => handleAction(action)}
                >
                  {translateToArabic(action)}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-2 text-center text-gray-500">
                لا توجد إجراءات متاحة
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cash/Credit Dialog */}
      <Dialog open={!!dialogAction} onOpenChange={() => closeDialog()}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {dialogAction === OrderAction.REFUND
                ? "هل أنت متأكد من رغبتك في استرداد هذا الطلب؟"
                : "هل أنت متأكد من رغبتك في إرجاع هذا الطلب؟"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>المدفوع كريديت</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...form.register("creditAmount", { valueAsNumber: true })}
                />
                {form.formState.errors.creditAmount && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.creditAmount.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>المدفوع كاش</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...form.register("cashAmount", { valueAsNumber: true })}
                />
                {form.formState.errors.cashAmount && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.cashAmount.message}
                  </span>
                )}
              </div>
            </div>

            {form.formState.errors.amount && (
              <div className="mt-2 text-center text-sm text-red-600">
                {form.formState.errors.amount.message}
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                إلغاء
              </Button>
              <Button type="submit">تأكيد</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Actions;
