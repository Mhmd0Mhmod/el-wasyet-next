import ClientDetails from "@/components/clients/ClientDetails";
import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  formatCurrency,
  formatDate,
  getRemainingDaysStyle,
} from "@/lib/helper";
import { OrderByStatus } from "@/types/order";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ReactNode } from "react";
import SelectOrderCheckbox from "./SelectOrderCheckbox";
import { OrderAction } from "@/types/order-actions";

const columns = [
  { id: "actions", label: "إدارة ألاجراءات" },
  { id: "name", label: "الاسم" },
  { id: "service", label: "الخدمة" },
  { id: "date", label: "التاريخ" },
  { id: "employee", label: "الموظف" },
  { id: "attachments", label: "المرفقات" },
  { id: "remainingChanges", label: "المطلوب تغييره" },
  { id: "overheads", label: "الغرامه" },
  { id: "remainingDays", label: "يتبقى على الانتهاء" },
  { id: "notes", label: "ملحوظات" },
];
function OrdersTable({
  orders,
  ActionsSelect,
}: {
  orders: (OrderByStatus & {
    rowClassName?: string;
  })[];
  ActionsSelect: React.FC<{ currentAction: OrderAction }>;
}) {
  return (
    <Table
      columns={columns}
      selectAll
      renderData={
        <>
          {orders.map((order) => (
            <TableRow key={order.orderId} className={order?.rowClassName}>
              <TableCell className="!px-2">
                <SelectOrderCheckbox orderId={order.orderId} />
              </TableCell>
              <TableCell>
                <ActionsSelect
                  currentAction={order.orderStatusForAction as OrderAction}
                />
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
              <TableCell>{order.orderCode}</TableCell>
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
              <TableCell>
                <Dialog>
                  <Dialog.Trigger>
                    <Button variant={"ghost"} disabled={!order.notes}>
                      {order.notes ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content title="ملحوظات الامر">
                    <p>{order.notes}</p>
                  </Dialog.Content>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </>
      }
    />
  );
}
export default OrdersTable;
