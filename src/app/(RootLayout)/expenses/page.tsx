import PageLayout from "@/components/Layout/PageLayout";
import { Suspense } from "react";
import TableSkeleton from "@/components/general/TableSkeleton";
import { getExpenses } from "@/data/expenses";
import Table from "@/components/general/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import Pagination from "@/components/general/Pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
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
async function DataTable({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const response = await getExpenses();
  console.log(response);
  const { items, pageNumber, totalPages } = response;
  const params = await searchParams;
  return (
    <>
      <Table
        columns={TABLE_COLUMNS}
        renderData={items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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
        <div className={"flex items-center justify-between gap-4"}>
          <Label className={"text-nowrap"}>إجمالي المصروفات: </Label>
          <Input disabled value={"0.00 ج.م"} type={"text"} />
        </div>
      </div>
    </>
  );
}

export default page;
