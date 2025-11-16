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
  startDate?: string;
  endDate?: string;
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
      startDate: "",
      endDate: "",
      branchId: "",
      employeeId: "",
    },
  });
  const onSubmit = useCallback(
    async (data: FilterFormValues) => {
      const queryParams = new URLSearchParams();
      if (data.startDate) {
        queryParams.append("startDate", data.startDate);
      }
      if (data.endDate) {
        queryParams.append("endDate", data.endDate);
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
        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className={"space-y-4"}>
          <Label htmlFor="startDate">من تاريخ</Label>
          <Input id="startDate" type="date" {...form.register("startDate")} />
        </div>
        <div className={"space-y-4"}>
          <Label htmlFor="endDate">إلى تاريخ</Label>
          <Input id="endDate" type="date" {...form.register("endDate")} />
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
