import { OrderByStatus } from "@/types/order";
import Table from "../general/Table";
import { TableRow, TableCell } from "../ui/table";
import { formatDate, getRemainingDaysStyle } from "@/lib/helper";

const columns = [
  { id: "select", label: "تحديد الكل" },
  { id: "actions", label: "إدارة الإيداعات" },
  { id: "name", label: "الاسم الكامل" },
  { id: "service", label: "الخدمة" },
  { id: "date", label: "التاريخ" },
  { id: "employee", label: "الموظف" },
  { id: "birthDate", label: "تاريخ الميلاد" },
  { id: "certificates", label: "الشهادات" },
  { id: "fines", label: "الغرامات" },
  { id: "remaining", label: "يتبقى على الانتهاء" },
  { id: "orderNumber", label: "رقم الأمر" },
  { id: "count", label: "العدد" },
  { id: "notes", label: "ملحوظات" },
];

function PendingCertificates({ orders }: { orders: OrderByStatus[] }) {
  return (
    <>
      <Table
        columns={columns}
        renderData={
          <>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <button>إدارة</button>
                </TableCell>
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell>{formatDate(order.orderDate, "date")}</TableCell>
                <TableCell>{order.createdBy}</TableCell>
                <TableCell>
                  {order.birthDate
                    ? formatDate(order.birthDate, "date")
                    : "غير محدد"}
                </TableCell>
                <TableCell>
                  {order.isStefaCertifacte ? "شهادة" : "غير متاح"}
                </TableCell>
                <TableCell>{order.fines}</TableCell>
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
                <TableCell>{order.orderCode}</TableCell>
                <TableCell>{order.quantity || "1"}</TableCell>
                <TableCell>
                  {order.comments_id_Wife_Mother ||
                    order.requiredChange_forthName_Husbend ||
                    "لا توجد ملاحظات"}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
    </>
  );
}
export default PendingCertificates;
