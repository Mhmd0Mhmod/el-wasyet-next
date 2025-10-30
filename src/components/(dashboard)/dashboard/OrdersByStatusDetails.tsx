import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { getRemainingDaysStyle } from "@/components/operation/helper";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOrdersByStatusDetails } from "@/data/dashboard";
import Link from "next/link";
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
  console.log(items);

  return (
    <Table
      columns={COLUMNS}
      renderData={items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <Button asChild variant="link" size="sm" className="text-primary">
              <Link href={`/orders/${item.id}`}>{item.orderCode}</Link>
            </Button>
          </TableCell>
          <TableCell>{item.customerName}</TableCell>
          <TableCell>{item.serviceName}</TableCell>
          <TableCell>
            {(() => {
              const style = getRemainingDaysStyle(item.remainingDays);
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
        </TableRow>
      ))}
    />
  );
}
export default OrdersByStatusDetails;
