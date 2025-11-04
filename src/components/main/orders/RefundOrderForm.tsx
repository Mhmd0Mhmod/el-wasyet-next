"use client";
import { refundOrder } from "@/actions/reports/actions";
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
import { Textarea } from "@/components/ui/textarea";
import { RefundOrderInput, refundOrderSchema } from "@/schema/refund-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function RefundOrderForm({ orderId }: { orderId: number }) {
  const form = useForm<RefundOrderInput>({
    resolver: zodResolver(refundOrderSchema),
    defaultValues: {
      orderId,
      action: "refund order",
      amount: 0,
      cashAmount: 0,
      creditAmount: 0,
      reason: "",
    },
  });
  const onSubmit = useCallback(
    async (data: RefundOrderInput) => {
      const id = toast.loading("جاري ارسال طلب المرتجع...");
      try {
        const response = await refundOrder(data);
        if (response.success) {
          toast.success("تم ارسال طلب المرتجع بنجاح", { id });
          form.reset();
        } else {
          toast.error(response.message || "حدث خطأ أثناء ارسال طلب المرتجع", {
            id,
          });
        }
      } catch {
        toast.error("حدث خطأ أثناء ارسال طلب المرتجع", { id });
      }
    },
    [form],
  );
  form.setValue(
    "amount",
    (form.getValues("cashAmount") || 0) + (form.getValues("creditAmount") || 0),
  );
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={"cashAmount"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدفوع كاش</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="ادخل المبلغ المدفوع كاش"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"creditAmount"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدفوع كريدت</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="ادخل المبلغ المدفوع كريدت"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"reason"}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>السبب</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ادخل سبب المرتجع"
                  rows={4}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">ارسال</Button>
        <Button variant="outline" type="button" onClick={() => form.reset()}>
          الغاء
        </Button>
      </form>
    </Form>
  );
}
export default RefundOrderForm;
