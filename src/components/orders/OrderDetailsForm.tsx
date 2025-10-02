"use client";
import { useOrderForm } from "../providers/OrderFormProvider";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "@/schema/order";

function OrderDetailsForm() {
  const form = useFormContext<OrderFormValues>();
  const { service, isLoadingService } = useOrderForm();

  if (isLoadingService) {
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
          <FormField
            control={form.control}
            name="BirthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تاريخ الميلاد</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العدد المطلوب</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      <FormField
        control={form.control}
        name="RequiredChange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>التغيير المطلوب</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="DeliveryAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان (للتوصيل)</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Notes"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>الملاحظات</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
export default OrderDetailsForm;
