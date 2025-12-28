export const dynamic = "force-dynamic";

import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import { TableCell, TableRow } from "@/components/ui/table";
import { getStockData } from "@/data/stock";
import Link from "next/link";
import { Suspense } from "react";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";

async function page() {
  const canView = await checkAccess(ABILITY_IDS.VIEW_STOCK);

  if (!canView) {
    return (
      <PageLayout title="عهده الاستمارات" description="متابعة الأداء العام">
        <div className="text-center text-gray-500">
          ليس لديك صلاحية لعرض هذه الصفحة
        </div>
      </PageLayout>
    );
  }

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
  {
    label: "مسؤول العهدة",
    id: "custodian",
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
            <TableCell>{item.withWho}</TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
export default page;
