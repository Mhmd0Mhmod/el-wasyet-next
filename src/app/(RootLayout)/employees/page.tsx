import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeTable from "@/components/employees/EmployeeTable";
import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";
import { getEmployees } from "@/lib/data/employee";
import { Plus } from "lucide-react";
import { Suspense } from "react";

function page() {
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
      <div>
        <Suspense fallback={<></>}>
          <EmployeesTableData />
        </Suspense>
      </div>
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
async function EmployeesTableData() {
  const employees = await getEmployees();
  return <EmployeeTable data={employees} />;
}
export default page;
