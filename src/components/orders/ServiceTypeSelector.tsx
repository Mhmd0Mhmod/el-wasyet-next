"use client";
import { useServices } from "@/hooks/useServices";
import { OrderFormValues } from "@/schema/order";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

function ServiceTypeSelector() {
  const { services, isLoadingServices } = useServices();
  const form = useFormContext<OrderFormValues>();

  if (isLoadingServices) {
    return (
      <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
    );
  }

  return (
    <FormField
      control={form.control}
      name="ServiceId"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value?.toString() || ""}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger className="w-full" size="default" dir="rtl">
                <SelectValue placeholder="أختر الخدمه" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default ServiceTypeSelector;
