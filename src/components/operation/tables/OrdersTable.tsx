import ClientDetails from "@/components/clients/ClientDetails";
import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import { OperationsProvider } from "@/components/providers/OperationsProvider";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/helper";
import { OrderByStatus } from "@/types/order";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Actions from "../actions/Actions";
import SelectOrderCheckbox from "./SelectOrderCheckbox";
import SelectAll from "./SelectAll";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRemainingDaysStyle } from "../helper";

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
function OrdersTable({ orders }: { orders: OrderByStatus[] }) {
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
                className={cn({
                  "bg-yellow-100": order.closeAskExpense,
                })}
              >
                <TableCell className="!px-2">
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
                      className="container overflow-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
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
                      <Button variant={"ghost"} disabled={!order.notes}>
                        {order.notes ? <EyeIcon /> : <EyeOffIcon />}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content title="ملاحظات الامر">
                      <p>{order.notes}</p>
                    </Dialog.Content>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <div className="flex items-center justify-end-safe gap-4">
        <div className="h-4 w-4 rounded-full border bg-yellow-100 text-sm font-medium" />
        <span>الاوامر المُحصَّلة بالفعل</span>
      </div>
    </OperationsProvider>
  );
}
export default OrdersTable;
