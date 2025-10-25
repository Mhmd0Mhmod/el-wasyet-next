"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const filterSchem = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});
type FilterValues = z.infer<typeof filterSchem>;

function FilterSection() {
  const form = useForm();
  const pathName = usePathname();
  const router = useRouter();
  const onSubmit = useCallback(
    (data: FilterValues) => {
      if (!data.fromDate || !data.toDate) {
        return;
      }
      const query = new URLSearchParams(data).toString();
      router.push(`${pathName}?${query}`);
    },
    [pathName, router],
  );
  return (
    <form
      className="grid grid-cols-3 justify-items-start gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="w-full space-y-2">
        <Label htmlFor="fromDate">تاريخ البدايه</Label>
        <Input type="date" id="fromDate" {...form.register("fromDate")} />
      </div>
      <div className="w-full space-y-2">
        <Label htmlFor="toDate">تاريخ النهايه</Label>
        <Input type="date" id="toDate" {...form.register("toDate")} />
      </div>
      <div className="flex w-full items-end justify-end">
        <Button
          type="submit"
          className="text-primary bg-primary/10 w-1/2 cursor-pointer hover:text-white"
        >
          بحث
        </Button>
      </div>
    </form>
  );
}
export default FilterSection;
