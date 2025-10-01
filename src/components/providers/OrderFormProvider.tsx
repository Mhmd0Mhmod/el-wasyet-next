"use client";

import {
  generateOrderDefaultValues,
  orderFormSchema,
  OrderFormValues,
} from "@/schema/order";
import { OrderDetails } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { useService } from "@/hooks/useService";
import { Form } from "../ui/form";

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
  function onSubmit(data: OrderFormValues) {
    console.log(data);
  }
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
}
export function useOrderForm() {
  return useFormContext<OrderFormValues>();
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
