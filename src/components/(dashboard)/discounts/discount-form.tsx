"use client";
import { createOffer, updateOffer } from "@/actions/discounts/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Offer } from "@/types/order";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function DiscountForm({ offer }: { offer?: Offer }) {
  const form = useForm({
    defaultValues: offer || {
      companyName: "",
      discountPercentage: 0,
    },
  });
  const onSubmit = useCallback(
    async (data: Partial<Offer>) => {
      const id = toast.loading("جاري الحفظ...");
      if (offer) {
        const response = await updateOffer(data);
        if (response.success) {
          toast.success("تم التحديث بنجاح", { id });
        } else {
          toast.error("حدث خطأ أثناء التحديث", { id });
        }
      } else {
        const respone = await createOffer(data);
        if (respone.success) {
          toast.success("تم الإنشاء بنجاح", { id });
        } else {
          toast.error("حدث خطأ أثناء الإنشاء", { id });
        }
      }
    },
    [offer],
  );
  const onReset = useCallback(() => form.reset(), [form]);
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="space-y-4">
          <Label htmlFor="companyName">اسم الشركة</Label>
          <Input
            id="companyName"
            {...form.register("companyName", {
              required: "هذا الحقل مطلوب",
            })}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="discountPercentage">نسبة الخصم</Label>
          <Input
            id="discountPercentage"
            type="text"
            {...form.register("discountPercentage", {
              required: "هذا الحقل مطلوب",
            })}
          />
        </div>
        {offer && (
          <div className="flex items-center gap-2">
            <Controller
              name={"isActive"}
              control={form.control}
              render={({ field }) => (
                <Checkbox
                  id="isActive"
                  {...field}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <Label htmlFor="isActive">حالة الخصم</Label>
          </div>
        )}
        <div className="col-span-2 flex justify-end space-x-4">
          <Button type="submit">حفظ</Button>
          <Button variant={"outline"} onClick={onReset}>
            إعادة تعيين
          </Button>
        </div>
      </form>
    </div>
  );
}
export default DiscountForm;
