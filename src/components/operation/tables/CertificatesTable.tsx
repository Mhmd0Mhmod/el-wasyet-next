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
import SelectOrderCheckbox from "./SelectOrderCheckbox";
import Actions from "../actions/Actions";
import { OperationsProvider } from "@/components/providers/OperationsProvider";
import SelectAll from "./SelectAll";
import Link from "next/link";

const columns = [
  { id: "actions", label: "إدارة الاجراءات" },
  { id: "order_code", label: "كود الطلب" },
  { id: "name", label: "الاسم الرباعي" },
  { id: "service", label: "الخدمة" },
  { id: "date", label: "التاريخ" },
  { id: "employee", label: "الموظف" },
  { id: "birthDate", label: "تاريخ الميلاد" },
  { id: "id", label: "رقم قومي" },
  { id: "fines-real-cost", label: "المصاريف" },
  { id: "fines", label: "الغرامات" },
  { id: "remaining", label: "يتبقى على الانتهاء" },
  { id: "count", label: "العدد" },
  { id: "notes", label: "ملحوظات" },
];

function CertificatesTable({
  orders,
}: {
  orders: (OrderByStatus & {
    rowClassName?: string;
  })[];
}) {
  return (
    <OperationsProvider orders={orders}>
      <Table
        columns={columns}
        selectAllComponent={SelectAll}
        renderData={
          <>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
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
                <TableCell>{formatDate(order.orderDate, "date")}</TableCell>
                <TableCell>{order.createdBy}</TableCell>
                <TableCell>
                  {order.birthDate
                    ? formatDate(order.birthDate, "date")
                    : "غير محدد"}
                </TableCell>
                <TableCell>{order.comments_id_Wife_Mother}</TableCell>
                <TableCell>{formatCurrency(order.finesRealCost)}</TableCell>
                <TableCell>
                  <Dialog>
                    <Dialog.Trigger>
                      <Button
                        variant={"ghost"}
                        className="p-0"
                        disabled={order.overheads.length === 0}
                      >
                        {order.overheads.length > 0 ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content title="تفاصيل الغرامات">
                      {order.overheads.length > 0 ? (
                        <ul className="list-disc space-y-2">
                          {order.overheads.map((overhead, index) => (
                            <li key={index}>{overhead}</li>
                          ))}
                        </ul>
                      ) : (
                        "لا توجد غرامات"
                      )}
                    </Dialog.Content>
                  </Dialog>
                </TableCell>
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
                <TableCell>{order.quantity || "1"}</TableCell>
                <TableCell>
                  <Dialog>
                    <Dialog.Trigger>
                      <Button
                        variant={"ghost"}
                        className="p-0"
                        disabled={
                          !order.comments_id_Wife_Mother &&
                          !order.requiredChange_forthName_Husbend
                        }
                      >
                        {order.comments_id_Wife_Mother ||
                        order.requiredChange_forthName_Husbend ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content title="ملحوظات">
                      {order.comments_id_Wife_Mother ||
                        order.requiredChange_forthName_Husbend}
                    </Dialog.Content>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
    </OperationsProvider>
  );
}
export default CertificatesTable;
