"use client";

import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { useOrderLogs } from "@/hooks/useOrderLogs";
import { formatCurrency, formatDate } from "@/lib/helper";
import { Order } from "@/types/order";
import { Phone, User } from "lucide-react";
import { memo, useState } from "react";

const COLUMNS = [
  { id: "actionDate", label: "التاريخ والوقت" },
  { id: "operationTypeName", label: "العملية" },
  { id: "employeeName", label: "الموظف" },
  { id: "serviceName", label: "الخدمة" },
  { id: "orderStatues", label: "الحاله بعد العملية" },
  { id: "amount", label: "المبلغ" },
  { id: "requiredChange", label: "ملاحظات/سيستم" },
  { id: "comments", label: "التعليقات" },
];
const LoadingSkeleton = memo(function Loading() {
  return (
    <div>
      <TableSkeleton columns={COLUMNS.length} rows={5} />
    </div>
  );
});

function OrderLogs({ order }: { order: Order }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { orderLogs, isLoading, error } = useOrderLogs({
    orderId: order.id,
    page: currentPage,
    search: "",
  });

  const totalPages = 1;

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">سجل الامر رقم :</CardTitle>
            <p className="text-muted-foreground mt-2">
              # {order.orderCode || `000-${String(order.id).padStart(9, "0")}`}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{order.clientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{order.clientPhoneNumber}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="p-4 text-red-500">حدث خطأ أثناء جلب السجلات.</div>
        ) : orderLogs?.length === 0 ? (
          <div className="text-muted-foreground p-4">لا توجد سجلات لعرضها.</div>
        ) : (
          <>
            <div className="relative overflow-x-auto">
              <Table
                columns={COLUMNS}
                renderData={orderLogs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {formatDate(log.actionDate, "datetime")}
                    </TableCell>
                    <TableCell>{log.operationTypeName}</TableCell>
                    <TableCell>{log.employeeName}</TableCell>
                    <TableCell>{log.serviceName}</TableCell>
                    <TableCell>
                      <Badge variant={"outline"}>{log.orderStatues}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(log.amount)}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"link"}
                            disabled={!log.requiredChange}
                          >
                            <span className="cursor-pointer underline">
                              {log.requiredChange ? "عرض" : "لا توجد "}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-sm">
                          {log.requiredChange}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button disabled={!log.comments} variant={"link"}>
                            <span className="cursor-pointer underline">
                              {log.comments ? "عرض" : "لا توجد "}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-sm">
                          {log.comments || "لا توجد تعليقات"}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              />
            </div>

            {totalPages > 1 && (
              <div className="border-t p-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      },
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderLogs;
