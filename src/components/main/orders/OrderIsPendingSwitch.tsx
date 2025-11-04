"use client";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { FormField } from "../../ui/form";
import { Switch } from "../../ui/switch";

function OrderIsPendingSwitch() {
  const { form } = useOrderForm();
  return (
    <FormField
      control={form.control}
      name="IsPending"
      render={({ field }) => (
        <Switch
          checked={field.value}
          id="is-pending"
          onCheckedChange={field.onChange}
          className="flex-row-reverse"
        />
      )}
    />
  );
}
export default OrderIsPendingSwitch;
