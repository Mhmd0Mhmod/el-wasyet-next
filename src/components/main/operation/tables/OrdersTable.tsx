import ClientDetails from "@/components/main/clients/ClientDetails";
import { OperationsProvider } from "@/components/providers/OperationsProvider";
import Dialog from "@/components/shared/Dialog";
import Table from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { OrderByStatus } from "@/types/order";
import { EyeIcon, EyeOffIcon, Plus } from "lucide-react";
import Link from "next/link";
import Actions from "../actions/Actions";
import AddNote from "../actions/add-note";
import { getRemainingDaysStyle } from "../helper";
import SelectAll from "./SelectAll";
import SelectOrderCheckbox from "./SelectOrderCheckbox";

const ORDER_TABLE_COLUMNS = [
  { id: "actions", label: "إدارة ألاجراءات" },
  { id: "order_code", label: "كود الطلب" },
  { id: "name", label: "الاسم" },
  { id: "service", label: "الخدمة" },
  { id: "date", label: "التاريخ" },
  { id: "employee", label: "الموظف" },
  { id: "remainingChanges", label: "المطلوب تغييره" },
  { id: "overheads", label: "الغرامه" },
  { id: "remainingDays", label: "يتبقى على الانتهاء" },
  { id: "branch", label: "الفرع" },
  { id: "notes", label: "ملاحظات" },
];
function OrdersTable({
  orders,
  children,
}: {
  orders: OrderByStatus[];
  children?: React.ReactNode;
}) {
  return (
    <OperationsProvider orders={orders}>
      <Table
        columns={ORDER_TABLE_COLUMNS}
        selectAllComponent={SelectAll}
        renderData={
          <>
            {orders.map((order) => (
              <TableRow
                key={order.orderId}
                className={cn(`bg-${order.color}`, {
                  "bg-yellow-200": order.closeAskExpense,
                })}
              >
                <TableCell className="px-2!">
                  <SelectOrderCheckbox orderId={order.orderId} />
                </TableCell>
                <TableCell>
                  <Actions order={order} />
                </TableCell>
                <TableCell>
                  <Button asChild variant={"link"}>
                    <Link href={`/orders/${order.orderId}`}>
                      {order.orderCode}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <Dialog.Trigger>
                      <Button className="cursor-pointer p-0" variant={"link"}>
                        {order.clientName}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content
                      title="تفاصيل العميل"
                      className="container sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
                    >
                      <div className="max-h-[70vh] space-y-10 overflow-auto">
                        <ClientDetails clientId={order.clientId} />
                      </div>
                    </Dialog.Content>
                  </Dialog>
                </TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell className="text-wrap">
                  {formatDate(order.orderDate, "datetime")}
                </TableCell>
                <TableCell>{order.createdBy}</TableCell>
                <TableCell>{order.requiredChange_forthName_Husbend}</TableCell>
                <TableCell>{formatCurrency(order.finesRealCost)}</TableCell>
                <TableCell>
                  {(() => {
                    const style = getRemainingDaysStyle(order.remainingDays);
                    const IconComponent = style.icon;

                    return (
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium ${style.className}`}
                      >
                        <IconComponent size={14} />
                        <span>{style.text}</span>
                      </span>
                    );
                  })()}
                </TableCell>
                <TableCell>{order.branchName}</TableCell>
                <TableCell>
                  <Dialog>
                    <Dialog.Trigger>
                      <Button
                        variant={"ghost"}
                        disabled={!order.comments_id_Wife_Mother}
                      >
                        {order.comments_id_Wife_Mother ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content title="ملاحظات الامر">
                      <p>{order.comments_id_Wife_Mother}</p>
                    </Dialog.Content>
                  </Dialog>
                  <Dialog>
                    <Dialog.Trigger>
                      <Button variant={"ghost"}>
                        <Plus size={16} />
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content title="إضافة ملاحظة">
                      <AddNote orderId={order.orderId} />
                    </Dialog.Content>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      {children}
    </OperationsProvider>
  );
}
export default OrdersTable;
