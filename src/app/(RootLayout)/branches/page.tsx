import NewBranch from "@/components/Branches/NewBranch";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getBranches } from "@/data/branches";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";

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
  searchParams: { search?: string; page?: string };
}) {
  const branches = await getBranches({
    search: searchParams.search,
    page: searchParams.page,
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
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const { search, page } = await searchParams;
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
      <SearchInput title="ابحث عن فرع" />

      <Suspense
        fallback={<TableSkeleton rows={5} columns={5} />}
        key={search + (page || "")}
      >
        <BranchesTableData searchParams={{ search, page }} />
      </Suspense>
    </PageLayout>
  );
}

export default page;
