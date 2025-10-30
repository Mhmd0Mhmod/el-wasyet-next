import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOrdersByStatusDetails } from "@/data/dashboard";
import { Suspense } from "react";
function OrdersByStatusDetails({ statusId }: { statusId: number }) {
  return (
    <Suspense fallback={<TableSkeleton columns={4} rows={5} />}>
      <OrdersByStatusDetailsContent statusId={statusId} />
    </Suspense>
  );
}

const COLUMNS = [
  {
    label: "كود الطلب",
    id: "orderCode",
  },
  {
    label: "اسم العميل",
    id: "customerName",
  },
  {
    label: "الخدمة",
    id: "serviceName",
  },
  {
    label: "يتبقي علي الانتهاء",
    id: "remainingDays",
  },
];
async function OrdersByStatusDetailsContent({
  statusId,
}: {
  statusId: number;
}) {
  const { items } = await getOrdersByStatusDetails(statusId);
  return (
    <Table
      columns={COLUMNS}
      renderData={items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.orderCode}</TableCell>
          <TableCell>{item.customerName}</TableCell>
          <TableCell>{item.serviceName}</TableCell>
          <TableCell>{item.remainingDays}</TableCell>
        </TableRow>
      ))}
    />
  );
}
export default OrdersByStatusDetails;
