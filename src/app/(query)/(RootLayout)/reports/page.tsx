import PageLayout from "@/components/Layout/PageLayout";
import { Suspense } from "react";
import TableSkeleton from "@/components/general/TableSkeleton";
import Table from "@/components/general/Table";
import { getReports } from "@/data/reports";
import { TableCell, TableRow } from "@/components/ui/table";
import { randomUUID } from "node:crypto";
import { formatCurrency, formatDate } from "@/lib/helper";
import Pagination from "@/components/general/Pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import Dialog from "@/components/general/Dialog";
// import { Button } from "@/components/ui/button";
// import ClientDetails from "@/components/clients/ClientDetails";

interface PageProps {
  searchParams: Promise<{
    startDate: string;
    endDate: string;
    page: string;
  }>;
}

function page({ searchParams }: PageProps) {
  return (
    <PageLayout
      title={"تقارير يومي "}
      description={"تقارير يومية للمصروفات ومتابعة حالتها"}
    >
      <Suspense fallback={<TableSkeleton columns={11} rows={11} />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
const TABLE_COLUMNS = [
  { id: "service", label: "الخدمه" },
  { id: "client", label: "العميل" },
  { id: "phone", label: "رقم هاتف  (العميل)" },
  { id: "date", label: "التاريخ" },
  { id: "employee", label: "الموظف" },
  { id: "branch", label: "الفرع" },
  { id: "cash", label: "كاش" },
  { id: "credit", label: "كريديت" },
  { id: "income", label: "الإيرادات" },
  { id: "expenses", label: "المصروفات" },
  { id: "netProfit", label: "صافي الربح" },
];
async function DataTable({ searchParams }: PageProps) {
  const params = await searchParams;
  const response = await getReports(params);
  const {
    items,
    pageNumber,
    totalPages,
    totalExpenses,
    totalAmount,
    totalNetAmount,
  } = response;
  return (
    <>
      <Table
        columns={TABLE_COLUMNS}
        renderData={items?.map((item) => (
          <TableRow key={item.id || randomUUID()}>
            <TableCell>{item.serviceName || "-"}</TableCell>
            <TableCell>
              {item.clientName}
              {/* <Dialog>
                <Dialog.Trigger>
                  <Button className="cursor-pointer p-0" variant={"link"}>
                    {item.clientName}
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content
                  title="تفاصيل العميل"
                  className="container overflow-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
                >
                  <div className="max-h-[70vh] space-y-10 overflow-auto">
                    <ClientDetails clientId={item.clientName} />
                  </div>
                </Dialog.Content>
              </Dialog> */}
            </TableCell>
            <TableCell>{item.clientPhoneNumber || "-"}</TableCell>
            <TableCell>{formatDate(item.orderDateTime, "datetime")}</TableCell>
            <TableCell>{item.employeeName || "-"}</TableCell>
            <TableCell>{item.branchName || "-"}</TableCell>
            <TableCell>{formatCurrency(item.cash)}</TableCell>
            <TableCell>{formatCurrency(item.credit)}</TableCell>
            <TableCell>{formatCurrency(item.amount)}</TableCell>
            <TableCell>{formatCurrency(item.expenses)}</TableCell>
            <TableCell>{formatCurrency(item.netAmount)}</TableCell>
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
