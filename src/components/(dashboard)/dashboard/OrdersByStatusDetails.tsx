"use client";
import ClientPagination from "@/components/shared/ClientPagination";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getRemainingDaysStyle } from "@/components/main/operation/helper";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useOrderStatusDetails from "@/hooks/use-order-status-details";
import Link from "next/link";
import { useState } from "react";
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
function OrdersByStatusDetails({
  statusId,
  dates,
}: {
  statusId: number;
  dates: { fromDate?: string; toDate?: string };
}) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data, isFetching } = useOrderStatusDetails({
    dates,
    orderStatusId: statusId,
    pageNumber,
  });

  if (isFetching) {
    return (
      <div className="overflow-hidden">
        <TableSkeleton columns={COLUMNS.length} rows={10} />
      </div>
    );
  }
  const {
    items,
    hasNextPage,
    hasPreviousPage,
    pageNumber: page,
    totalPages,
  } = data;

  return (
    <>
      <div className="max-h-[70vh] overflow-auto">
        <Table
          columns={COLUMNS}
          renderData={items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="text-primary"
                >
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
      </div>

      <ClientPagination
        pageNumber={page}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </>
  );
}

export default OrdersByStatusDetails;
