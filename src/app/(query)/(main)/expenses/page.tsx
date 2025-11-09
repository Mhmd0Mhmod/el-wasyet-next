import FilterSection from "@/components/(dashboard)/dashboard/filter";
import PageLayout from "@/components/Layout/PageLayout";
import AddNewExpense from "@/components/main/expenses/add-new-expense";
import DeleteExpense from "@/components/main/expenses/DeleteExpense";
import Pagination from "@/components/shared/Pagination";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { getExpenses } from "@/data/expenses";
import { formatCurrency, formatDate } from "@/lib/helper";
import { Trash2Icon } from "lucide-react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    fromDate: string;
    toDate: string;
    page: string;
  }>;
}

function page({ searchParams }: Props) {
  return (
    <PageLayout
      title={"المصروفات"}
      description={"سجل المصروفات ومتابعة حالتها"}
    >
      <FilterSection />
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
      <AddNewExpense />
    </PageLayout>
  );
}

const TABLE_COLUMNS = [
  { label: "التاريخ", id: "date" },
  { label: "القيمه", id: "amount" },
  { label: "ملاحظات", id: "notes" },
  { label: "الفرع", id: "branch" },
  { label: "الموظف", id: "employee" },
  { label: "العمليات", id: "actions " },
];
async function DataTable({ searchParams }: Props) {
  const params = await searchParams;
  const response = await getExpenses(params);
  const { items, pageNumber, totalPages } = response;
  const total = items?.reduce((sum, item) => sum + item.amount, 0) || 0;
  return (
    <>
      <Table
        columns={TABLE_COLUMNS}
        renderData={items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{formatDate(item.entryDate, "datetime")}</TableCell>
            <TableCell>{formatCurrency(item.amount)}</TableCell>
            <TableCell>{item.comments}</TableCell>
            <TableCell>{item.branchName}</TableCell>
            <TableCell>{item.employeeName}</TableCell>
            <TableCell>
              <DeleteExpense expenseId={item.id}>
                <Button
                  variant="ghost"
                  className="hover:text-red-400"
                  size="icon"
                >
                  <Trash2Icon />
                </Button>
              </DeleteExpense>
            </TableCell>
          </TableRow>
        ))}
      />
      <div className={"flex items-center justify-between"}>
        <Pagination
          className={"justify-start"}
          totalPages={totalPages}
          page={pageNumber}
          searchParams={params}
        />
        <div className={"mr-auto flex items-center justify-between gap-4"}>
          <Label className={"text-nowrap"}>إجمالي المصروفات: </Label>
          <Input
            disabled
            value={formatCurrency(total)}
            type={"text"}
            className={"bg-gray-300"}
          />
        </div>
      </div>
    </>
  );
}

export default page;
