import Pagination from "@/components/general/Pagination";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ExportExecutiveReportButton from "@/components/reports/executive/export-executive-report-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { getExcutiveReport } from "@/data/reports";
import { formatCurrency, formatDate } from "@/lib/helper";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    page: string;
  }>;
}

function page({ searchParams }: PageProps) {
  return (
    <PageLayout
      title={"تقرير تنفيذي "}
      description={"تقارير تنفيذية لمتابعة الأداء والعمليات اليومية "}
      extra={<ExportExecutiveReportButton />}
    >
      <Suspense fallback={<TableSkeleton columns={11} rows={11} />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
const TABLE_COLUMNS = [
  { label: "رقم الامر", id: "order-number" },
  { id: "service", label: "اسم الخدمة" },
  { id: "client", label: "اسم العميل" },
  { id: "orderCode", label: "كود الامر" },
  { id: "operationTime", label: "وقت العملية" },
  { id: "employee", label: "الموظف" },
  { label: "السعر", id: "amount" },
  { label: "ملاحظات", id: "notes" },
  { id: "operationType", label: "نوع العملية" },
  { id: "branch", label: "الفرع" },
  { id: "orderStatus", label: "حالة الأوردر" },
];
async function DataTable({ searchParams }: PageProps) {
  const params = await searchParams;
  const response = await getExcutiveReport(params);
  const { items, pageNumber, totalPages } = response;
  const { records, totalAmount, totalExpenses, totalNetAmount } = items.at(
    0,
  ) || {
    records: [],
    totalAmount: 0,
    totalExpenses: 0,
    totalNetAmount: 0,
  };
  return (
    <>
      <Table
        columns={TABLE_COLUMNS}
        renderData={records?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Button variant="link" size="sm" asChild>
                <Link href={`/orders/${item.orderId}`}>{item.orderId}</Link>
              </Button>
            </TableCell>

            <TableCell>{item.serviceName}</TableCell>
            <TableCell>{item.clientName}</TableCell>
            <TableCell>
              <Button variant="link" size="sm" asChild>
                <Link href={`/orders/${item.orderId}`}>{item.orderCode}</Link>
              </Button>
            </TableCell>
            <TableCell>{formatDate(item.actionDate, "datetime")}</TableCell>
            <TableCell>{item.createdbyEmployeeName}</TableCell>
            <TableCell>{formatCurrency(item.amount)}</TableCell>
            <TableCell>{item.notes}</TableCell>
            <TableCell>{item.orderstatus}</TableCell>
            <TableCell>{item.branchName}</TableCell>
            <TableCell>{item.orderstatus}</TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        totalPages={totalPages}
        page={pageNumber}
        searchParams={params}
      />
      <div className={"mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"}>
        <div className={"space-y-2"}>
          <Label>إجمالي المصروفات</Label>
          <Input
            disabled
            className={"disabled:bg-gray-300"}
            value={formatCurrency(totalExpenses)}
          />
        </div>
        <div className={"space-y-2"}>
          <Label>إجمالي الإيرادات</Label>
          <Input
            disabled
            className={"disabled:bg-gray-300"}
            value={formatCurrency(totalAmount)}
          />
        </div>
        <div className={"space-y-2"}>
          <Label>إجمالي صافي الربح</Label>
          <Input
            disabled
            className={"disabled:bg-gray-300"}
            value={formatCurrency(totalNetAmount)}
          />
        </div>
      </div>
    </>
  );
}
export default page;
