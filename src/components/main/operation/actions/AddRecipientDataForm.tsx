"use client";

import { addRecipientData } from "@/actions/[operations]/action";
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
  AddReccipientForm,
  AddRecipientFormType,
} from "@/schema/recipient-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";

function AddRecipientDataForm({ orderId }: { orderId: number }) {
  const form = useForm<AddRecipientFormType>({
    resolver: zodResolver(AddReccipientForm),
    defaultValues: {
      orderId: orderId.toString(),
      receiverName: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (data: AddRecipientFormType) => {
    const formData = new FormData();
    formData.append("orderId", data.orderId);
    formData.append("receiverName", data.receiverName);
    formData.append("reciverImage", data.reciverImage);
    const id = toast.loading("جاري إضافة بيانات المستلم...");

    const response = await addRecipientData(formData);
    if (response.success) {
      toast.success(response.message, {
        id,
      });
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast.error(response.message, { id });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="receiverName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستلم</FormLabel>
              <FormControl>
                <Input placeholder="اسم المستلم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reciverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>صورة بطاقة المستلم</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...field}
                  value={undefined}
                  ref={fileInputRef}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
export default AddRecipientDataForm;
function SubmitButton() {
  const { isSubmitting } = useFormState();
  return (
    <Button disabled={isSubmitting} className="w-full">
      {isSubmitting ? "جاري الإرسال..." : "إرسال"}
    </Button>
  );
}
