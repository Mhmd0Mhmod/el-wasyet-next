"use client";
import { useOperations } from "@/components/providers/OperationsProvider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOrderActions } from "@/data/orders";
import { OrderAction } from "@/types/order-actions";
import { usePathname } from "next/navigation";
import { translateToArabic } from "../helper";

function SelectAll() {
  const pathname = usePathname();
  const { selectAllOrderIds, operations, orders, unSelectAllOrderIds } =
    useOperations();
  const allSelected =
    orders.length > 0 &&
    orders.every((order) =>
      operations.some((op) => op.orderId === order.orderId),
    );
  const actions = getOrderActions({
    canSelectAll: true,
    pathname,
  });
  function onSelect(action: OrderAction) {
    selectAllOrderIds(action);
  }
  function unSelectAll() {
    unSelectAllOrderIds();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Checkbox checked={allSelected} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {allSelected && (
          <DropdownMenuItem
            variant="destructive"
            className="text-sm"
            onClick={unSelectAll}
          >
            الغاء تحديد الكل
          </DropdownMenuItem>
        )}
        {actions.map((action) => (
          <DropdownMenuItem key={action} onClick={() => onSelect(action)}>
            {translateToArabic(action)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SelectAll;
