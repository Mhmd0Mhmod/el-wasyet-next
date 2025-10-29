import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/helper";
import { OrderByStatus } from "@/types/order";
import { EyeIcon, EyeOffIcon, Plus } from "lucide-react";
import Link from "next/link";
import SendCodeButton from "../actions/send-code-button";
import { getRemainingDaysStyle } from "../helper";
import AddNote from "../actions/add-note";
import { cn } from "@/lib/utils";

const ORDER_TABLE_COLUMNS = [
  { id: "order_code", label: "كود الطلب" },
  {
    id: "name",
    label: "الاسم",
  },
  {
    id: "service",
    label: "الخدمة",
  },
  {
    id: "date",
    label: "التاريخ",
  },
  {
    id: "employee",
    label: "الموظف",
  },
  {
    id: "attachments",
    label: "المرفقات",
  },
  {
    id: "remainingChanges",
    label: "المطلوب تغييره",
  },
  { id: "cost", label: "المصاريف" },
  {
    id: "overheads",
    label: "الغرامه",
  },
  {
    id: "remainingDays",
    label: "يتبقى على الانتهاء",
  },
  {
    id: "code_status",
    label: "حالة الكود",
  },
  { id: "branch", label: "الفرع" },

  {
    id: "notes",
    label: "ملاحظات",
  },
];
function OrderReceiptTable({ orders }: { orders: OrderByStatus[] }) {
  return (
    <>
      <Table
        columns={ORDER_TABLE_COLUMNS}
        renderData={orders.map((order) => (
          <TableRow key={order.orderId} className={cn(`bg-${order.color}`)}>
            <TableCell>
              <Button asChild variant={"link"}>
                <Link href={`/orders/${order.orderId}`}>{order.orderCode}</Link>
              </Button>
            </TableCell>
            <TableCell>{order.clientName}</TableCell>
            <TableCell>{order.serviceName}</TableCell>
            <TableCell>{formatDate(order.orderDate, "datetime")}</TableCell>
            <TableCell>{order.createdBy}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{order.requiredChange_forthName_Husbend}</TableCell>
            <TableCell>{formatCurrency(order.finesRealCost)}</TableCell>
            {/* should change to be the real overheads value */}
            <TableCell>
              <Dialog>
                <Dialog.Trigger>
                  <Button
                    variant={"ghost"}
                    className="p-0"
                    disabled={order.overheads.length === 0}
                  >
                    {order.overheads.length > 0 ? <EyeIcon /> : <EyeOffIcon />}
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
            <TableCell>
              <SendCodeButton order={order}>إرسال كود</SendCodeButton>
            </TableCell>
            <TableCell>{order.branchName}</TableCell>
            <TableCell>
              <Dialog>
                <Dialog.Trigger>
                  <Button
                    variant={"link"}
                    disabled={!order.comments_id_Wife_Mother}
                  >
                    {order.comments_id_Wife_Mother ? (
                      <EyeIcon />
                    ) : (
                      <EyeOffIcon />
                    )}
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="الملاحظات">
                  <p>{order.comments_id_Wife_Mother}</p>
                </Dialog.Content>
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
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
export default OrderReceiptTable;
