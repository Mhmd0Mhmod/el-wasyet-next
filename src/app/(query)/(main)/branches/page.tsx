import NewBranch from "@/components/main/Branches/NewBranch";
import SearchInput from "@/components/shared/SearchInput";
import Table from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getBranches } from "@/data/branches";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ExportButton from "@/components/shared/export-button";

const columns = [
  { id: "name", label: "اسم الفرع" },
  { id: "address", label: "العنوان" },
  { id: "manager", label: "مدير الفرع" },
  { id: "email", label: "الايميل" },
  { id: "actions", label: " العمليات" },
];

async function BranchesTableData({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const branches = await getBranches({
    search: searchParams.search,
  });

  return (
    <>
      <Table
        columns={columns}
        renderData={branches?.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.address}</TableCell>
            <TableCell>{branch.managerName}</TableCell>
            <TableCell>{branch.email}</TableCell>
            <TableCell className="flex gap-2">
              <Button asChild variant="ghost">
                <Link href={`/branches/${branch.id}`}>
                  <Eye />
                </Link>
              </Button>
              <NewBranch
                branch={branch}
                Trigger={() => (
                  <Button variant="ghost">
                    <Edit2 />
                  </Button>
                )}
              />
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  return (
    <PageLayout
      title="الفروع"
      description="إدارة جميع فروع الشركة"
      extra={
        <NewBranch
          Trigger={() => (
            <Button>
              <Plus />
              إضافة فرع جديد
            </Button>
          )}
        />
      }
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <SearchInput title="ابحث عن فرع" />
        <ExportButton url="Branch/export" params={params} />
      </div>
      <Suspense
        fallback={<TableSkeleton rows={5} columns={5} />}
        key={JSON.stringify(params)}
      >
        <BranchesTableData searchParams={params} />
      </Suspense>
    </PageLayout>
  );
}

export default page;
