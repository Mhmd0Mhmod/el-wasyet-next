import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import { TableCell, TableRow } from "@/components/ui/table";
import { getStockData } from "@/data/stock";
import Link from "next/link";
import { Suspense } from "react";

function page() {
  return (
    <PageLayout title="عهده الاستمارات" description="متابعة الأداء العام">
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <StockDataTable />
      </Suspense>
    </PageLayout>
  );
}
const COLUMNS = [
  {
    label: "رقم الفرع",
    id: "branchNumber",
  },
  {
    label: "اسم الفرع",
    id: "branchName",
  },
];
async function StockDataTable() {
  const data = await getStockData();
  return (
    <>
      <Table
        columns={COLUMNS}
        renderData={data.map((item) => (
          <TableRow key={item.branchId}>
            <TableCell>
              <Link
                href={`/stock/${item.branchId}`}
                className="text-blue-600 hover:underline"
              >
                {item.branchId}
              </Link>
            </TableCell>
            <TableCell>{item.branchName}</TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
export default page;
