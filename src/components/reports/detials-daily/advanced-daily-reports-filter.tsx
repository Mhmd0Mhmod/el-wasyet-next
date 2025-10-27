"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShortBranch } from "@/types/branch";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
interface FilterFormValues {
  fromDate?: string;
  toDate?: string;
  branchId?: string;
  employeeId?: string;
}
function AdvancedDailyReportsFilter({
  branchs,
  employees,
}: {
  branchs: ShortBranch[];
  employees: BasicEntity[];
}) {
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<FilterFormValues>({
    defaultValues: {
      fromDate: "",
      toDate: "",
      branchId: "",
      employeeId: "",
    },
  });
  const onSubmit = useCallback(
    async (data: FilterFormValues) => {
      const queryParams = new URLSearchParams();
      if (data.fromDate) {
        queryParams.append("fromDate", data.fromDate);
      }
      if (data.toDate) {
        queryParams.append("toDate", data.toDate);
      }
      if (data.branchId) {
        queryParams.append("branchId", data.branchId);
      }
      if (data.employeeId) {
        queryParams.append("employeeId", data.employeeId);
      }
      router.push(`${pathName}?${queryParams.toString()}`);
    },
    [pathName, router],
  );
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <div className={"space-y-4"}>
          <Label htmlFor="fromDate">من تاريخ</Label>
          <Input id="fromDate" type="date" {...form.register("fromDate")} />
        </div>
        <div className={"space-y-4"}>
          <Label htmlFor="toDate">إلى تاريخ</Label>
          <Input id="toDate" type="date" {...form.register("toDate")} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Button type="submit" size={"lg"}>
            بحث
          </Button>
        </div>
        <div className={"space-y-4"}>
          <Label htmlFor="branchId">الفرع</Label>
          <Controller
            control={form.control}
            name="branchId"
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="branchId" className="w-full" dir="rtl">
                  <SelectValue placeholder="اختر فرعاً" />
                </SelectTrigger>
                <SelectContent>
                  {branchs.map((branch) => (
                    <SelectItem
                      key={branch.branchId}
                      value={branch.branchId.toString()}
                    >
                      {branch.branchName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className={"space-y-4"}>
          <Label htmlFor="employeeId">الموظف</Label>
          <Controller
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="employeeId" className="w-full" dir="rtl">
                  <SelectValue placeholder="اختر موظفاً" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem
                      key={employee.id}
                      value={employee.id.toString()}
                    >
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </form>
    </div>
  );
}
export default AdvancedDailyReportsFilter;
