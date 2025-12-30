import EmployeeForm from "@/components/main/employees/EmployeeForm";
import Dialog from "@/components/shared/Dialog";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEmployees, getRoles } from "@/data/employee";
import { cn } from "@/lib/utils";
import { CheckCircle, Edit, Eye, Plus, XCircle } from "lucide-react";
import { Suspense } from "react";
import ExportButton from "@/components/shared/export-button";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";
import { getManagersBranches } from "@/data/branches";

function NewEmployeeButton({
  managersBranches,
  roles,
}: {
  managersBranches: ShortManager[];
  roles: Role[];
}) {
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
        className="mx-auto max-h-[80vh] min-w-2xl overflow-y-auto"
      >
        <EmployeeForm managers={managersBranches} roles={roles} />
      </Dialog.Content>
    </Dialog>
  );
}
const EMPLOYEE_TABLE_COLUMNS = [
  { id: "name", label: "الاسم" },
  { id: "phone", label: "رقم الهاتف" },
  { id: "email", label: "البريد الالكتروني" },
  { id: "role", label: "الوظيفة" },
  { id: "suspended", label: "الحالة" },
  { id: "actions", label: "العمليات" },
];
async function EmployeesTable({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const canEdit = await checkAccess(ABILITY_IDS.UPDATE_EMPLOYEE);

  const [managersBranches, roles, pageContent] = await Promise.all([
    getManagersBranches(),
    getRoles(),
    getEmployees({
      search: searchParams.search || "",
      page: parseInt(searchParams.page || "1", 10),
    }),
  ]);
  const { items: employees, pageNumber, totalPages } = pageContent;

  return (
    <>
      <Table
        columns={EMPLOYEE_TABLE_COLUMNS}
        renderData={employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.phone}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.role}</TableCell>
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
                  <Dialog.Content
                    title="تفاصيل موظف"
                    className="mx-auto max-h-[80vh] min-w-2xl overflow-y-auto"
                  >
                    <EmployeeForm
                      employeeId={employee.id}
                      disabled
                      managers={managersBranches}
                      roles={roles}
                    />
                  </Dialog.Content>
                </Dialog>
                {canEdit && (
                  <Dialog>
                    <Dialog.Trigger>
                      <Button variant="ghost" size="sm" aria-label="تعديل">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content
                      title="تعديل موظف"
                      className="mx-auto max-h-[80vh] min-w-2xl overflow-y-auto"
                    >
                      <EmployeeForm
                        employeeId={employee.id}
                        managers={managersBranches}
                        roles={roles}
                      />
                    </Dialog.Content>
                  </Dialog>
                )}
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
  const params = await searchParams;
  const canCreate = await checkAccess(ABILITY_IDS.CREATE_EMPLOYEE);
  const [managersBranches, roles] = await Promise.all([
    getManagersBranches(),
    getRoles(),
  ]);
  return (
    <PageLayout
      title="الموظفين"
      description="إدارة جميع موظفي الشركة"
      extra={
        canCreate && (
          <NewEmployeeButton
            managersBranches={managersBranches}
            roles={roles}
          />
        )
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <SearchInput title="ابحث عن موظف" />
        <ExportButton url="Employee/export-excel" params={params} />
      </div>

      <Suspense
        fallback={<TableSkeleton rows={5} columns={5} />}
        key={JSON.stringify(params)}
      >
        <EmployeesTable searchParams={params} />
      </Suspense>
    </PageLayout>
  );
}
export default page;
