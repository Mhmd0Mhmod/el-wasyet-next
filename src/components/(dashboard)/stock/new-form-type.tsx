"use client";
import { addNewFormType } from "@/actions/stock/actions";
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
import { NewFormTypeForm, NewFormTypeSchema } from "@/schema/new-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type NewFormTypeProps = {
  onAdded?: () => void;
};

function NewFormType({ onAdded }: NewFormTypeProps) {
  const form = useForm<NewFormTypeForm>({
    resolver: zodResolver(NewFormTypeSchema),
    defaultValues: {
      formName: "",
      price: 0,
    },
  });
  const onSubmit = useCallback(
    async (data: NewFormTypeForm) => {
      const id = toast.loading("جاري الحفظ...");
      try {
        const response = await addNewFormType(data);
        if (response.success) {
          toast.success("تم الحفظ بنجاح", { id });
          onAdded?.();
          form.reset();
        } else {
          toast.error(`حدث خطأ: ${response.message}`, { id });
        }
      } catch (error) {
        toast.error(`حدث خطأ: ${error}`, { id });
      }
    },
    [onAdded, form],
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <FormField
          control={form.control}
          name="formName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الاستمارة</FormLabel>
              <FormControl>
                <Input
                  placeholder="اكتب اسم الاستمارة"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سعر الاستمارة</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="اكتب سعر الاستمارة"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end">
          <Button type="submit">حفظ</Button>
        </div>
      </form>
    </Form>
  );
}
export default NewFormType;
