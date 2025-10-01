"use client";
import { useServices } from "@/hooks/useServices";
import { useOrderForm } from "../providers/OrderFormProvider";
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
  const form = useOrderForm();

  if (isLoadingServices) {
    return (
      <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
    );
  }

  return (
    <div className="space-y-2">
      <Select
        value={form.watch("ServiceId")?.toString() || ""}
        onValueChange={(value) => form.setValue("ServiceId", parseInt(value))}
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
      {form.formState.errors.ServiceId && (
        <p className="text-sm text-red-600">
          {form.formState.errors.ServiceId.message}
        </p>
      )}
    </div>
  );
}
export default ServiceTypeSelector;
