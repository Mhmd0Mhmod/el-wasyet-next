"use client";
import { useServices } from "@/hooks/useServices";
import { OrderFormField } from "../providers/OrderFormProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function ServiceTypeSelector() {
  const { services, isLoadingServices } = useServices();

  return (
    <OrderFormField
      name="ServiceId"
      isLoading={isLoadingServices}
      render={({ field }) => {
        console.log(field);
        return (
          <Select
            {...field}
            onValueChange={(Value) => field.onChange(parseInt(Value))}
            value={field.value ? field.value?.toString() : ""}
          >
            <SelectTrigger
              className="w-full md:w-auto"
              size="default"
              dir="rtl"
            >
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
        );
      }}
    />
  );
}
export default ServiceTypeSelector;
