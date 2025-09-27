import EmployeeForm from "@/components/employees/EmployeeForm";
import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEmployees } from "@/data/employee";
import { cn } from "@/lib/utils";
import { CheckCircle, Edit, Eye, Plus, XCircle } from "lucide-react";
import { Suspense } from "react";

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
          <h1 className="text-3xl font-bold">الموظفين</h1>
          <p className="text-gray-500">إدارة جميع موظفي الشركة</p>
        </div>
        <div>
          <NewEmployeeButton />
        </div>
      </div>
      <>
        <Suspense
          fallback={<TableSkeleton rows={5} columns={5} />}
          key={search + (page || "")}
        >
          <EmployeesTable searchParams={{ search, page }} />
        </Suspense>
      </>
    </section>
  );
}
function NewEmployeeButton() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>
          <Plus />
          إضافة موظف جديد
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="إضافة موظف جديد">
        <div className="max-h-[80vh] overflow-y-auto">
          <EmployeeForm />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
const EMPLOYEE_TABLE_COLUMNS = [
  { id: "name", label: "الاسم" },
  { id: "phone", label: "رقم الهاتف" },
  { id: "email", label: "البريد الالكتروني" },
  { id: "suspended", label: "الحالة" },
  { id: "actions", label: "العمليات" },
];
async function EmployeesTable({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const {
    items: employees,
    pageSize,
    pageNumber,
    totalRecords,
  } = await getEmployees({
    search: searchParams.search || "",
    page: parseInt(searchParams.page || "1", 10),
  });
  return (
    <>
      <SearchInput title="ابحث عن موظف" />
      <Table
        columns={EMPLOYEE_TABLE_COLUMNS}
        renderData={employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.phone}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>
              <Badge
                variant={employee.suspended ? "secondary" : "destructive"}
                className={cn({
                  "bg-green-100 text-green-800 hover:bg-green-100":
                    !employee.suspended,
                  "bg-red-100 text-red-800 hover:bg-red-100":
                    employee.suspended,
                })}
              >
                {employee.suspended ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                {employee.suspended ? "متوقف" : "نشط"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Dialog>
                  <Dialog.Trigger>
                    <Button variant="ghost" size="sm" aria-label="عرض">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content title="تفاصيل موظف">
                    <div className="max-h-[80vh] overflow-y-auto">
                      <EmployeeForm employeeId={employee.id} disabled />
                    </div>
                  </Dialog.Content>
                </Dialog>
                <Dialog>
                  <Dialog.Trigger>
                    <Button variant="ghost" size="sm" aria-label="تعديل">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content title="تعديل موظف">
                    <div className="max-h-[80vh] overflow-y-auto">
                      <EmployeeForm employeeId={employee.id} />
                    </div>
                  </Dialog.Content>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
      <Pagination total={totalRecords} pageSize={pageSize} page={pageNumber} />
    </>
  );
}
export default page;
