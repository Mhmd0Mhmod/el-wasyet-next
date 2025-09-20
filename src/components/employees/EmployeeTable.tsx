"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEmployees } from "@/lib/data/employee";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye, Search } from "lucide-react";
import { useState } from "react";
import Input from "../general/Input";
import Table from "../general/Table";
import { TableCell, TableRow } from "../ui/table";
import Dialog from "../general/Dialog";
import EmployeeForm from "./EmployeeForm";

const EMPLOYEE_TABLE_COLUMNS = [
  { id: "name", label: "الاسم" },
  { id: "phone", label: "رقم الهاتف" },
  { id: "email", label: "البريد الالكتروني" },
  { id: "suspended", label: "الحالة" },
  { id: "actions", label: "العمليات" },
];

function EmployeeTable({ data }: { data?: ShortEmployee[] }) {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data: employees, error } = useQuery<ShortEmployee[]>({
    queryKey: ["employees", search, pageNumber],
    initialData: [...Array.from(data || [])],
    queryFn: () => getEmployees({ search, pageNumber }),
    refetchOnMount: "always",
    enabled: search.length > 2 || search.length === 0 || pageNumber > 1,
    placeholderData: data,
  });

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  if (error) {
    return (
      <div className="text-red-500">
        {error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً"}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Input
        Icon={Search}
        props={{
          value: search,
          onChange: onChangeSearch,
          placeholder: "ابحث هنا...",
          className: "pr-8",
          type: "text",
        }}
        container="max-w-sm"
      />
      <Table
        columns={EMPLOYEE_TABLE_COLUMNS}
        renderData={
          employees?.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <Badge
                  variant={employee.suspended ? "secondary" : "destructive"}
                  className={cn({
                    "bg-green-100 text-green-800 hover:bg-green-100":
                      employee.suspended,
                    "bg-red-100 text-red-800 hover:bg-red-100":
                      !employee.suspended,
                  })}
                >
                  {employee.suspended ? "نشيط ✓" : "متوقف ✗"}
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
                        <EmployeeForm initialData={employee} disabled />
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
                        <EmployeeForm initialData={employee} />
                      </div>
                    </Dialog.Content>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          )) || null
        }
      />
    </div>
  );
}

export default EmployeeTable;
