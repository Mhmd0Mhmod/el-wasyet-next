import NewBranch from "@/components/Branches/NewBranch";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getBranches } from "@/lib/data/branches";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const { search, page } = await searchParams;
  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">الفروع</h1>
          <p className="text-gray-500">إدارة جميع فروع الشركة</p>
        </div>
        <div>
          <NewBranch
            Trigger={() => (
              <Button>
                <Plus />
                إضافة فرع جديد
              </Button>
            )}
          />
        </div>
      </div>

      <Suspense fallback={<></>}>
        <BranchesTableData searchParams={{ search, page }} />
      </Suspense>
    </section>
  );
}

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
    search: searchParams.search || "",
    page: parseInt(searchParams.page || "1", 10),
  });
  return (
    <>
      <SearchInput title="ابحث عن فرع" />
      <Table
        columns={columns}
        renderData={branches?.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.address}</TableCell>
            <TableCell>{branch.managerName}</TableCell>
            <TableCell>{branch.email}</TableCell>
            <TableCell className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/branches/${branch.id}`}>
                  <Eye />
                </Link>
              </Button>
              <NewBranch
                branch={branch}
                Trigger={() => (
                  <Button variant="outline">
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
export default page;
