import PageLayout from "@/components/Layout/PageLayout";
import AdvancedDailyReportsFilter from "@/components/main/reports/detials-daily/advanced-daily-reports-filter";
import ExportDetailsDailyReportsButton from "@/components/main/reports/detials-daily/export-details-daily-report-button";
import Pagination from "@/components/shared/Pagination";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEmployeeBasic } from "@/data/employee";
import { getAdvancedDailyReport } from "@/data/reports";
import { authFetch } from "@/lib/axios";
import { formatCurrency, formatDate } from "@/lib/helper";
import { ShortBranch } from "@/types/branch";
import { DateRange } from "@/types/filter";
import Link from "next/link";
import { Suspense } from "react";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";

interface PageProps {
  searchParams: Promise<
    DateRange & {
      branchId?: string;
      employeeId?: string;
      page: string;
    }
  >;
}

async function page({ searchParams }: PageProps) {
  const canView = await checkAccess(ABILITY_IDS.VIEW_DAILY_DETAILS_REPORT);

  if (!canView) {
    return (
      <PageLayout
        title="تقارير يومي تفصيلي"
        description="تقارير يومية للمصروفات ومتابعة حالتها"
      >
        <div className="text-center text-gray-500">
          ليس لديك صلاحية لعرض هذه الصفحة
        </div>
      </PageLayout>
    );
  }

  const { data: branchs } = await authFetch.get<ShortBranch[]>("Auth/branches");
  const employees = await getEmployeeBasic();
  const params = await searchParams;
  return (
    <PageLayout
      title="تقارير يومي تفصيلي"
      description="تقارير يومية للمصروفات ومتابعة حالتها"
      extra={<ExportDetailsDailyReportsButton params={params} />}
    >
      <AdvancedDailyReportsFilter branchs={branchs} employees={employees} />
      <Suspense
        fallback={<TableSkeleton columns={11} rows={11} />}
        key={JSON.stringify(params)}
      >
        <DataTable searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
const TABLE_COLUMNS = [
  { id: "operationCode", label: "كود العملية" },
  { id: "operationType", label: "نوع العملية" },
  { id: "service", label: "اسم الخدمة" },
  { id: "client", label: "اسم العميل" },
  { id: "phone", label: "رقم العميل" },
  { id: "cash", label: "كاش" },
  { id: "credit", label: "كريديت" },
  { id: "price", label: "السعر" },
  { id: "expenses", label: "المصاريف " },
  { id: "netAmount", label: "صافي الربح " },
  { id: "operationTime", label: "وقت العملية" },
  { id: "orderCode", label: "كود الأوردر" },
  { id: "branch", label: "الفرع" },
  { id: "employee", label: "الموظف" },
  { id: "orderEmployeeCreator", label: "منشئ الطلب" },
  { id: "orderStatus", label: "حالة الأوردر" },
];
async function DataTable({ searchParams }: PageProps) {
  const params = await searchParams;
  const response = await getAdvancedDailyReport(params);
  const { items, pageNumber, totalPages } = response;
  const {
    records,
    totalAmount,
    totalExpenses,
    totalNetAmount,
    totalCash,
    totalCredit,
  } = items.at(0) || {
    records: [],
    totalAmount: 0,
    totalExpenses: 0,
    totalNetAmount: 0,
    totalCash: 0,
    totalCredit: 0,
  };
  return (
    <>
      <Table
        columns={TABLE_COLUMNS}
        renderData={records?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.operationType}</TableCell>
            <TableCell>{item.serviceName}</TableCell>
            <TableCell>{item.clientName}</TableCell>
            <TableCell>{item.clientPhoneNumber}</TableCell>
            <TableCell>{formatCurrency(item.cash)}</TableCell>
            <TableCell>{formatCurrency(item.credit)}</TableCell>
            <TableCell>{formatCurrency(item.amount)}</TableCell>
            <TableCell>{formatCurrency(item.expenses)}</TableCell>
            <TableCell>{formatCurrency(item.netAmount)}</TableCell>
            <TableCell>{formatDate(item.actionDate, "datetime")}</TableCell>
            <TableCell>
              <Button variant="link" size="sm" asChild>
                <Link href={`/orders/${item.orderId}`}>{item.orderCode}</Link>
              </Button>
            </TableCell>
            <TableCell>{item.branchName}</TableCell>
            <TableCell>{item.employeeName || "---"}</TableCell>
            <TableCell>{item.isCreatedByEmployeeName || "---"}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        totalPages={totalPages}
        page={pageNumber}
        searchParams={params}
      />
      <div className={"mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"}>
        <div className={"flex space-x-2 whitespace-nowrap"}>
          <Label>مجموع الكاش</Label>
          <Input
            disabled
            className={"disabled:bg-gray-300"}
            value={formatCurrency(totalCash)}
          />
        </div>
        <div className={"flex space-x-2 whitespace-nowrap"}>
          <Label>مجموع الكريديت</Label>
          <Input
            disabled
            className={"disabled:bg-gray-300"}
            value={formatCurrency(totalCredit)}
          />
        </div>
      </div>
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
