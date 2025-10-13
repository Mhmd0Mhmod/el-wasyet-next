"use client";
import { useOperations } from "@/components/providers/OperationsProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOrderActions } from "@/data/orders";
import { translateToArabic } from "@/lib/helper";
import { OrderByStatus } from "@/types/order";
import { OrderAction } from "@/types/order-actions";
import { MoreVerticalIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Actions({ order }: { order: OrderByStatus }) {
  const pathName = usePathname();
  const { orderStatusForAction } = order;
  const { operations, addOperation, removeOperation, updateOperation } =
    useOperations();

  const operation = operations.find((op) => op.orderId === order.orderId);
  const action = (operation?.action as OrderAction) || orderStatusForAction;
  const [selectedAction, setSelectedAction] = useState<OrderAction | null>(
    action || null,
  );
  const orderActions = getOrderActions(pathName || "");
  const [open, setOpen] = useState(false);

  const handleAction = (action: OrderAction) => {
    const needsDialog = [OrderAction.REFUND, OrderAction.RETURN].includes(
      action,
    );
    if (needsDialog) {
      setOpen(true);
    } else {
      setSelectedAction(action);
      addOperation({
        orderId: order.orderId,
        action,
      });
    }
  };
  useEffect(() => {
    if (operation || orderStatusForAction) {
      setSelectedAction(
        (operation?.action as OrderAction) || orderStatusForAction,
      );
    } else {
      setSelectedAction(null);
    }
  }, [operation, orderStatusForAction]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div className="flex min-w-32 items-center justify-between">
        {translateToArabic(selectedAction?.toString() || "") || "No Action"}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="scale-75">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <>
              {orderActions.length > 0 ? (
                orderActions.map((action) => (
                  <DropdownMenuItem
                    key={action}
                    className="w-full cursor-pointer whitespace-nowrap"
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
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>النقديه</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="mt-4 flex justify-end gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">إلغاء</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>تأكيد</Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default Actions;
