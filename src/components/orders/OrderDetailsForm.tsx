"use client";
import { useOrderForm, useOrderService } from "../providers/OrderFormProvider";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { handleNumberKeyPress } from "@/lib/utils";

function OrderDetailsForm() {
  const form = useOrderForm();
  const { service, isLoading } = useOrderService();
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-4">
      {service?.isCertificate && (
        <>
          <div className="space-y-2">
            <Label htmlFor="BirthDate">تاريخ الميلاد</Label>
            <Input type="date" {...form.register("BirthDate")} />
            {form.formState.errors.BirthDate && (
              <p className="text-sm text-red-600">
                {form.formState.errors.BirthDate.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="Amount">العدد المطلوب</Label>
            <Input
              type="number"
              {...form.register("Amount", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              onKeyPress={handleNumberKeyPress}
            />
            {form.formState.errors.Amount && (
              <p className="text-sm text-red-600">
                {form.formState.errors.Amount.message}
              </p>
            )}
          </div>
        </>
      )}
      <div className="space-y-2">
        <Label htmlFor="RequiredChange">التغيير المطلوب</Label>
        <Textarea {...form.register("RequiredChange")} />
        {form.formState.errors.RequiredChange && (
          <p className="text-sm text-red-600">
            {form.formState.errors.RequiredChange.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="DeliveryAddress">عنوان (للتوصيل)</Label>
        <Textarea {...form.register("DeliveryAddress")} />
        {form.formState.errors.DeliveryAddress && (
          <p className="text-sm text-red-600">
            {form.formState.errors.DeliveryAddress.message}
          </p>
        )}
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="Notes">الملاحظات</Label>
        <Textarea {...form.register("Notes")} />
        {form.formState.errors.Notes && (
          <p className="text-sm text-red-600">
            {form.formState.errors.Notes.message}
          </p>
        )}
      </div>
    </div>
  );
}
export default OrderDetailsForm;
