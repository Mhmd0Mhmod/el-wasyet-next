import EmployeeForm from "@/components/main/employees/EmployeeForm";
import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEmployees } from "@/data/employee";
import { cn } from "@/lib/utils";
import { CheckCircle, Edit, Eye, Plus, XCircle } from "lucide-react";
import { Suspense } from "react";

function NewEmployeeButton() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>
          <Plus />
          إضافة موظف جديد
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="إضافة موظف جديد"
        className="mx-auto max-h-[80vh] max-w-4xl overflow-y-auto"
      >
        <EmployeeForm />
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
    pageNumber,
    totalPages,
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
                  <Dialog.Content
                    title="تعديل موظف"
                    className="mx-auto max-h-[80vh] max-w-4xl overflow-y-auto"
                  >
                    <EmployeeForm employeeId={employee.id} />
                  </Dialog.Content>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        totalPages={totalPages}
        page={pageNumber}
        searchParams={searchParams}
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
      title="الموظفين"
      description="إدارة جميع موظفي الشركة"
      extra={<NewEmployeeButton />}
    >
      <Suspense
        fallback={<TableSkeleton rows={5} columns={5} />}
        key={search + (page || "")}
      >
        <EmployeesTable searchParams={{ search, page }} />
      </Suspense>
    </PageLayout>
  );
}
export default page;
