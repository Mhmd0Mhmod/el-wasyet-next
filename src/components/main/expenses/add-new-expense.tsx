"use client";

import { addNewExpense } from "@/actions/expenses/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBranches } from "@/hooks/use-branches";
import { ExpenseInput, expenseSchema } from "@/schema/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddNewExpense() {
  const form = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      entryDate: "",
      amount: 0,
    },
  });
  const { data: branches, isFetching: isLoading } = useBranches();
  const onSubmit = useCallback(
    async (data: ExpenseInput) => {
      const id = toast.loading("جاري الحفظ...");
      try {
        const reponse = await addNewExpense(data);
        if (reponse.success) {
          toast.success("تم الحفظ بنجاح", { id });
          form.reset();
        } else {
          toast.error(`حدث خطأ: ${reponse.message}`, { id });
        }
      } catch {
        toast.error(`حدث خطأ اثناء الحفظ`, { id });
      }
    },
    [form],
  );
  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-5 md:grid-cols-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تاريخ الإدخال</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المبلغ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الفرع</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={String(field.value || "")}
                    disabled={isLoading}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger dir="rtl" className="w-full">
                      <SelectValue placeholder="اختر الفرع" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches?.map((branch) => (
                        <SelectItem
                          key={branch.branchId}
                          value={String(branch.branchId)}
                        >
                          {branch.branchName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>الملاحظات</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-full">
            إضافه
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default AddNewExpense;
