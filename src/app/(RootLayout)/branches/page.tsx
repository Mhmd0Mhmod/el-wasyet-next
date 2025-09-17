import NewBranchButton from "@/components/Branches/NewBranchButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { branchesMock } from "@/lib/mock/branches.mock";
import { Edit2, Eye } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
function page() {
  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-center sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">الفروع</h1>
          <p className=" text-gray-500">إدارة جميع فروع الشركة</p>
        </div>
        <div>
          <NewBranchButton />
        </div>
      </div>
      <div>
        <Suspense fallback={<></>}>
          <BranchesTableData />
        </Suspense>
      </div>
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
function BranchesTableData() {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.label} className="text-right">
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {branchesMock.slice(0, 10).map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.address}</TableCell>
            <TableCell>{branch.manager}</TableCell>
            <TableCell>{branch.email}</TableCell>
            <TableCell className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/branches/${branch.id}`}>
                  <Eye />
                </Link>
              </Button>
              <NewBranchButton branch={branch}>
                <Button variant="outline">
                  <Edit2 />
                </Button>
              </NewBranchButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default page;
