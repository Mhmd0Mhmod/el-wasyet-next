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
import { translateToArabic } from "@/lib/helper";
import { OrderAction } from "@/types/order-actions";
import { usePathname } from "next/navigation";

function SelectAll() {
  const pathName = usePathname();
  const { selectAllOrderIds, operations, orders } = useOperations();
  const allSelected =
    orders.length > 0 &&
    orders.every((order) =>
      operations.some((op) => op.orderId === order.orderId),
    );
  const actions = getOrderActions(pathName);
  function onSelect(action: OrderAction) {
    selectAllOrderIds(action);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Checkbox checked={allSelected} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
