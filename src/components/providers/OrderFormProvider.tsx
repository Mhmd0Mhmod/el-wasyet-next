"use client";

import { createOrder } from "@/actions/orders/actions";
import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { useService } from "@/hooks/useService";
import {
  generateOrderDefaultValues,
  orderFormSchema,
  OrderFormValues,
} from "@/schema/order";
import { OrderDetails } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";

interface OrderFormContextProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  totalAmount: number;
  isLoadingService: boolean;
  isLoadingOffers: boolean;
  isLoadingAgents: boolean;
  offers?: ReturnType<typeof useOffers>["offers"];
  agents?: ReturnType<typeof useAgents>["agents"];
  service?: ReturnType<typeof useService>["service"];
}

const OrderContext = createContext<OrderFormContextProps>({
  form: {} as ReturnType<typeof useForm<OrderFormValues>>,
  totalAmount: 0,
  isLoadingService: false,
  isLoadingOffers: false,
  isLoadingAgents: false,
  offers: [],
  agents: [],
  service: undefined,
});

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
    const id = toast.loading("جاري إنشاء الطلب...");
    createOrder(data)
      .then((res) => {
        if (res.success) {
          toast.success("تم إنشاء الطلب بنجاح", { id });
          form.reset(generateOrderDefaultValues());
        } else {
          toast.error(res.message || "حدث خطأ أثناء إنشاء الطلب", {
            id,
          });
        }
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء إنشاء الطلب", { id });
      });
  }
  const selectedService = form.watch("ServiceId");
  const { service, isLoading: isLoadingService } = useService(selectedService);
  const { offers, isLoadingOffers } = useOffers();
  const { agents, isLoadingAgents } = useAgents();
  const totalAmount = useCalculateOverheadsTotal(service, offers, agents, form);

  return (
    <OrderContext.Provider
      value={{
        form,
        offers,
        agents,
        totalAmount,
        service,
        isLoadingService,
        isLoadingOffers,
        isLoadingAgents,
      }}
    >
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
        </Form>
      </FormProvider>
    </OrderContext.Provider>
  );
}
export function useOrderForm() {
  const values = useContext(OrderContext);
  if (!values) {
    throw new Error("useOrderForm must be used within an OrderFormProvider");
  }
  return values;
}
function useCalculateOverheadsTotal(
  service: ReturnType<typeof useService>["service"],
  offers: ReturnType<typeof useOffers>["offers"],
  agents: ReturnType<typeof useAgents>["agents"],
  form: ReturnType<typeof useForm<OrderFormValues>>,
) {
  if (!service) return 0;

  const { overheads = [] } = service;
  const selectedOverheads = form.watch("OverheadIds") || [];
  const selectedOverheadsValue = overheads
    .filter((overhead) => selectedOverheads?.includes(overhead.id))
    .reduce((acc, curr) => acc + curr.value, 0);
  const customOverheadsValue =
    form
      .watch("CustomOverheads")
      ?.reduce((acc, curr) => acc + (curr.value || 0), 0) || 0;
  const offerPercentage =
    offers?.find((o) => o.offerId === form.watch("OfferId"))
      ?.discountPercentage || 0;
  const agentPercentage =
    agents?.find((a) => a.id === form.watch("AgentId"))?.commissionPercentage ||
    0;

  const baseAmount =
    (service?.defaultFees || 0) +
    selectedOverheadsValue +
    (customOverheadsValue || 0);
  const offerDiscount =
    ((service?.defaultFees || 0) * (offerPercentage || 0)) / 100;
  const agentCommission =
    ((service?.defaultFees || 0) * (agentPercentage || 0)) / 100;

  return baseAmount - offerDiscount + agentCommission;
}

export default OrderFromProvider;
