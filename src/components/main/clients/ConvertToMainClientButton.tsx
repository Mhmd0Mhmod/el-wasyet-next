"use client";
import { convertToMainClient } from "@/actions/clients/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const convertToMainClientSchema = z.object({
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
    .min(11, "رقم الهاتف يجب أن يكون على الأقل 11 أرقام")
    .max(15, "رقم الهاتف يجب ألا يزيد عن 15 رقم"),
});

type ConvertToMainClientFormValues = z.infer<typeof convertToMainClientSchema>;

function ConvertToMainClientButton({
  clientId,
  onConvert,
}: {
  clientId: number;
  onConvert?: () => void;
}) {
  const form = useForm<ConvertToMainClientFormValues>({
    resolver: zodResolver(convertToMainClientSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ConvertToMainClientFormValues) => {
      const id = toast.loading("جاري التحويل إلى عميل رئيسي...");
      try {
        const response = await convertToMainClient(clientId, data);
        if (response.success) {
          toast.success(response.message || "تم التحويل إلى عميل رئيسي بنجاح", {
            id,
          });
          form.reset();
          onConvert?.();
        } else {
          toast.error(response.message || "فشل التحويل إلى عميل رئيسي", { id });
        }
      } catch {
        toast.error("حدث خطأ غير متوقع أثناء التحويل", { id });
      }
    },
    [clientId, onConvert, form],
  );
  const onCancel = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Users className="ml-2" />
          تحويل إلى عميل رئيسي
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader className="sm:text-right">
          <AlertDialogTitle>تحويل إلى عميل رئيسي</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد أنك تريد تحويل هذا العميل إلى عميل رئيسي؟ يرجى إدخال
            رقم الهاتف للمتابعة.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      {...field}
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button type="button" variant="outline" onClick={onCancel}>
                  إلغاء
                </Button>
              </AlertDialogCancel>
              <Button
                type="submit"
                variant="default"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "جاري التحويل..." : "تحويل"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ConvertToMainClientButton;
