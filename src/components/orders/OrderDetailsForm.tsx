"use client";
import { OrderFormField } from "../providers/OrderFormProvider";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function OrderDetailsForm() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-4">
      <OrderFormField
        name="BirthDate"
        label="تاريخ الميلاد"
        render={({ field }) => (
          <Input type="date" {...field} value={field.value?.toString() || ""} />
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
