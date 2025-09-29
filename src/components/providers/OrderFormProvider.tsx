"use client";

import {
  generateOrderDefaultValues,
  orderFormSchema,
  OrderFormValues,
} from "@/schema/order";
import { OrderDetails } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { createFormField } from "../general/FormComponent";
import { useService } from "@/hooks/useService";

function OrderFromProvider({
  orderDetails,
  children,
}: {
  orderDetails?: Partial<OrderDetails>;
  children: React.ReactNode;
}) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: generateOrderDefaultValues(orderDetails),
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}
export function useOrderForm() {
  return useFormContext<OrderFormValues>();
}

export function OrderFormField(
  props: Parameters<ReturnType<typeof createFormField<OrderFormValues>>>[0],
) {
  const form = useOrderForm();
  const FormField = createFormField(form);
  return <FormField {...props} />;
}
export function useOrderService() {
  const serviceId = useOrderForm().watch("ServiceId");
  const { service, isLoading, error } = useService(serviceId);
  return {
    service,
    isLoading,
    error,
  };
}

export default OrderFromProvider;
