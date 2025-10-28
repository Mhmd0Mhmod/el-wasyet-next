"use client";

import { addNote } from "@/actions/[operations]/action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface FormValues {
  orderId: number;
  notes: string;
}
function AddNote({ orderId }: { orderId: number }) {
  const form = useForm<FormValues>({
    defaultValues: {
      orderId,
      notes: "",
    },
  });
  const onSubmit = useCallback(
    async (data: FormValues) => {
      const id = toast.loading("جاري الحفظ...");
      try {
        console.log(data);

        const response = await addNote(data);
        if (response.success) {
          toast.success("تم الحفظ بنجاح", { id });
          form.reset();
        } else {
          toast.error(`حدث خطأ: ${response.message}`, { id });
        }
      } catch (error) {
        toast.error(`حدث خطأ: ${error}`, { id });
      }
    },
    [form],
  );
  return (
    <div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Textarea
            {...form.register("notes", { required: true })}
            className="border-input w-full rounded-md border p-2"
            placeholder="أضف ملاحظة"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            إضافة الملاحظة
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddNote;
