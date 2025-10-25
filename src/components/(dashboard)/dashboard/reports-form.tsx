"use client";

import { ActivityReportExcelExport } from "@/actions/dashboard/actions-client";
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
import { useBranches } from "@/hooks/use-branches";
import { useEmployees } from "@/hooks/use-employees";
import useRequestStatus from "@/hooks/use-request-status";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export type ReportsFormValues = {
  startDate?: string;
  endDate?: string;
  employeeId?: number;
  branchId?: number;
  requestType?: number;
};

function ReportsForm() {
  const form = useForm<ReportsFormValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      employeeId: undefined,
      branchId: undefined,
      requestType: undefined,
    },
  });

  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const { data: branches, isLoading: isLoadingBranches } = useBranches();
  const { data: requestStatus, isLoading: isLoadingRequestStatus } =
    useRequestStatus();

  const onSubmit = useCallback(async (data: ReportsFormValues) => {
    const toastId = toast.loading("جاري توليد التقرير...");

    try {
      await ActivityReportExcelExport(data);
      toast.success("تم تنزيل التقرير بنجاح", { id: toastId });
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("حدث خطأ أثناء توليد التقرير", { id: toastId });
    }
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    toast.info("تم إعادة تعيين الفلاتر");
  }, [form]);

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ البدء</Label>
            <Input
              type="date"
              id="startDate"
              dir="rtl"
              {...form.register("startDate")}
            />
            {form.formState.errors.startDate && (
              <p className="text-sm text-red-500">
                {form.formState.errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ الانتهاء</Label>
            <Input
              type="date"
              id="endDate"
              dir="rtl"
              {...form.register("endDate")}
            />
            {form.formState.errors.endDate && (
              <p className="text-sm text-red-500">
                {form.formState.errors.endDate.message}
              </p>
            )}
          </div>

          {/* Employee Selection */}
          <div className="space-y-2">
            <Label htmlFor="employeeId">الموظف</Label>
            <Controller
              name="employeeId"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  dir="rtl"
                  disabled={isLoadingEmployees}
                >
                  <SelectTrigger id="employeeId" className="w-full">
                    <SelectValue placeholder="اختر موظفاً" />
                  </SelectTrigger>

                  <SelectContent>
                    {employees?.map((employee) => (
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

          {/* Branch Selection */}
          <div className="space-y-2">
            <Label htmlFor="branchId">الفرع</Label>
            <Controller
              name="branchId"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  dir="rtl"
                  disabled={isLoadingBranches}
                >
                  <SelectTrigger id="branchId" className="w-full">
                    <SelectValue placeholder="اختر فرعاً" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches?.map((branch) => (
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

          {/* Request Type Selection */}
          <div className="col-span-2 space-y-2">
            <Label htmlFor="requestType">نوع الطلب</Label>
            <Controller
              name="requestType"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  dir="rtl"
                  disabled={isLoadingRequestStatus}
                >
                  <SelectTrigger id="requestType" className="w-full">
                    <SelectValue placeholder="اختر نوع الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestStatus?.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row-reverse sm:justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="sm:w-36"
          >
            إعادة تعيين
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="sm:w-36"
          >
            تم
          </Button>
        </div>
      </form>
    </div>
  );
}
export default ReportsForm;
