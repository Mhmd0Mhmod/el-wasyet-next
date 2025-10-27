"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
interface FilterFormValues {
  fromDate?: string;
  toDate?: string;
}
function DailyReportsFilter() {
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<FilterFormValues>({
    defaultValues: {
      fromDate: "",
      toDate: "",
    },
  });
  const onSubmit = useCallback(
    (data: FilterFormValues) => {
      const queryParams = new URLSearchParams();
      if (data.fromDate) {
        queryParams.append("fromDate", data.fromDate);
      }
      if (data.toDate) {
        queryParams.append("toDate", data.toDate);
      }
      router.push(`${pathName}?${queryParams.toString()}`);
    },
    [pathName, router],
  );
  return (
    <div>
      <form
        className="grid grid-cols-1 items-center-safe gap-4 md:grid-cols-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <Label htmlFor="fromDate">من تاريخ</Label>
          <Input id="fromDate" type="date" {...form.register("fromDate")} />
        </div>
        <div className="space-y-4">
          <Label htmlFor="toDate">إلى تاريخ</Label>
          <Input id="toDate" type="date" {...form.register("toDate")} />
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
