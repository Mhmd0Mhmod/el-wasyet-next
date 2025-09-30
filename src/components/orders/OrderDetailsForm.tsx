"use client";
import {
  OrderFormField,
  useOrderService,
} from "../providers/OrderFormProvider";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

function OrderDetailsForm() {
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
          <OrderFormField
            name="BirthDate"
            label="تاريخ الميلاد"
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                value={field.value?.toString() || ""}
              />
            )}
          />
          <OrderFormField
            name="Amount"
            label="العدد المطلوب"
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                value={field.value?.toString() || ""}
              />
            )}
          />

          <OrderFormField
            name="RequiredChange"
            label="التغيير المطلوب"
            render={({ field }) => (
              <Textarea
                {...field}
                onChange={field.onChange}
                value={field.value?.toString() || ""}
              />
            )}
          />

          <OrderFormField
            name="DeliveryAddress"
            label="عنوان (للتوصيل)"
            render={({ field }) => (
              <Textarea
                {...field}
                onChange={field.onChange}
                value={field.value?.toString() || ""}
              />
            )}
          />
        </>
      )}
      <OrderFormField
        name="Notes"
        label="الملاحظات"
        className="col-span-2"
        render={({ field }) => (
          <Textarea
            {...field}
            onChange={field.onChange}
            value={field.value?.toString() || ""}
          />
        )}
      />
    </div>
  );
}
export default OrderDetailsForm;
