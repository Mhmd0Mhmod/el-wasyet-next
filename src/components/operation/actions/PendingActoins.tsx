"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { translateToArabic } from "@/lib/helper";
import { OrderAction } from "@/types/order-actions";
import { MoreVerticalIcon } from "lucide-react";
import { usePathname } from "next/navigation";
function getOrderActions(pathname: string): OrderAction[] {
  // Extract page type from pathname
  const path = pathname.toLowerCase();

  if (path.includes("pending-orders")) {
    // 1. Pending Orders - for all users
    return [
      OrderAction.NEW_ORDER,
      OrderAction.CANCEL,
      OrderAction.REFUND, // [cash, credit dialog]
    ];
  }

  if (path.includes("new-orders") || path.includes("new-certificates")) {
    // 2 & 3. New Orders - for all users (condition: not asked before)
    return [
      OrderAction.ASK_EXPENSES, // Only if !closeAskExpense
    ];
  }

  if (path.includes("collected")) {
    // 4. Collection Done - for executives
    return [
      OrderAction.UNDER_PROCESSING,
      OrderAction.STEFA_CLIENT, // Only if isStefaClient
      OrderAction.STEFA_CERTIFICATE, // Only if isStefaCertificate
      OrderAction.RETURN, // [cash, credit dialog]
    ];
  }

  if (path.includes("in-progress")) {
    // 5. Under Processing - for executives
    return [
      OrderAction.COMPLETED,
      OrderAction.STEFA_SGL, // Only if isStefaSGL
      OrderAction.RETURN, // [cash, credit dialog]
    ];
  }

  if (path.includes("completed-orders")) {
    // 6. Completed Orders - for call center
    return [OrderAction.CONTACTED];
  }

  if (path.includes("order-receipt")) {
    // 7. Receiving Orders - sequence workflow
    return [
      OrderAction.SEND_CODE,
      OrderAction.WRITE_CODE,
      OrderAction.RECEIVING_DONE,
    ];
  }

  if (path.includes("stefa-sgl")) {
    // Optional: SGL Page - for executives
    return [
      OrderAction.COLLECTION_DONE,
      OrderAction.RETURN, // [cash, credit dialog]
    ];
  }

  // Default: no actions
  return [];
}

function Actions({ currentAction }: { currentAction?: OrderAction }) {
  const pathName = usePathname();
  const orderActions = getOrderActions(pathName || "");

  const handleAction = (action: OrderAction) => {
    // Check if action requires dialog (cash/credit input)
    const needsDialog = [OrderAction.REFUND, OrderAction.RETURN].includes(
      action,
    );

    if (needsDialog) {
      // TODO: Open dialog for cash/credit input
      console.log(`Opening dialog for ${action}`);
      return;
    }

    // Execute action directly
    console.log(`Executing action: ${action}`);
  };

  return (
    <div className="flex min-w-32 items-center justify-between">
      {translateToArabic(currentAction?.toString() || "") || "No Action"}
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
  );
}
export default Actions;
