import PageLayout from "@/components/Layout/PageLayout";
import { Suspense } from "react";
import TableSkeleton from "@/components/general/TableSkeleton";
import { getExpenses } from "@/data/expenses";
import Table from "@/components/general/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import Pagination from "@/components/general/Pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/helper";
import { Edit3Icon } from "lucide-react";
import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{
    date: string;
    page: string;
  }>;
}

function page({ searchParams }: Props) {
  return (
    <PageLayout
      title={"المصروفات"}
      description={"سجل المصروفات ومتابعة حالتها"}
    >
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
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
  const response = await getExpenses({
    date: params.date,
    page: params.page,
  });
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
              <Dialog>
                <Dialog.Trigger>
                  <Button variant={"ghost"} size={"icon"}>
                    <Edit3Icon size={16} />
                  </Button>
                </Dialog.Trigger>
              </Dialog>
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
