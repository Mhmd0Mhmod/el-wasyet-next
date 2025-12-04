"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
interface FilterFormValues {
  startDate?: string;
  endDate?: string;
}
function DailyReportsFilter() {
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<FilterFormValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });
  const onSubmit = useCallback(
    (data: FilterFormValues) => {
      const queryParams = new URLSearchParams();
      if (data.startDate) {
        queryParams.append("startDate", data.startDate);
      }
      if (data.endDate) {
        queryParams.append("endDate", data.endDate);
      }
      router.push(`${pathName}?${queryParams.toString()}`);
    },
    [pathName, router],
  );
  return (
    <div>
      <form
        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <Label htmlFor="startDate">من تاريخ</Label>
          <Input id="startDate" type="date" {...form.register("startDate")} />
        </div>
        <div className="space-y-4">
          <Label htmlFor="endDate">إلى تاريخ</Label>
          <Input id="endDate" type="date" {...form.register("endDate")} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Button type="submit" size={"lg"}>
            بحث
          </Button>
        </div>
      </form>
    </div>
  );
}
export default DailyReportsFilter;
