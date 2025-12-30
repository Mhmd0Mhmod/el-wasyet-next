"use client";

import { createOrder, updateOrder } from "@/actions/orders/actions";
import { Form } from "@/components/ui/form";
import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { useService } from "@/hooks/useService";
import { orderFormSchema, OrderFormValues } from "@/schema/order";
import { Agent, Offer } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface OrderFormContextProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  totalAmount: number;
  isLoadingService: boolean;
  offers?: Offer[];
  agents?: Agent[];
  service?: ReturnType<typeof useService>["service"];
  isEditMode: boolean;
}

const OrderContext = createContext<OrderFormContextProps>({
  form: {} as ReturnType<typeof useForm<OrderFormValues>>,
  totalAmount: 0,
  isLoadingService: false,
  offers: [],
  agents: [],
  service: undefined,
  isEditMode: false,
});

function OrderFromProvider({
  orderDetails,
  offers,
  agents,
  children,
}: {
  orderDetails?: Partial<OrderFormValues> & {
    OrderId: number;
  };
  children: React.ReactNode;
  offers: Offer[];
  agents: Agent[];
}) {
  const isEditMode = Boolean(orderDetails?.OrderId);
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: orderDetails || {
      ClientId: 0,
      RequiredChange: "",
      Notes: "",
      DeliveryAddress: "",
      BirthDate: null,
      Quantity: undefined,
      Cash: 0,
      Credit: 0,
      Amount: 0,
      ServiceFees: 0,
      Documents: [],
      CustomDocuments: [],
      OverheadIds: [],
      CustomOverheads: [],
      CreateFiles: [],
      IsPending: false,
      OfferId: undefined,
      AgentId: undefined,
    },
  });

  const router = useRouter();
  const onSubmit = useCallback(async () => {
    const data = form.getValues();
    if (isEditMode) {
      const id = toast.loading("جاري تحديث الأمر...");
      try {
        const response = await updateOrder(orderDetails!.OrderId, data);

        if (!response.success) {
          toast.error(
            response.message || "حدث خطأ أثناء تحديث الأمر. حاول مرة أخرى.",
            { id },
          );
          return;
        }
        toast.success("تم تحديث الأمر بنجاح!", { id });
        router.push(`/orders/${orderDetails!.OrderId}`);
      } catch (error) {
        toast.error("حدث خطأ أثناء تحديث الأمر. حاول مرة أخرى.", { id });
        console.error(error);
      }
    } else {
      const toastId = toast.loading("جاري إنشاء الأمر...");
      try {
        const response = await createOrder(data);
        if (response.success) {
          toast.success("تم إنشاء الأمر بنجاح!", { id: toastId });
          form.reset();
          router.push(`/orders/${response.data}`);
        } else {
          toast.error(
            response.message || "حدث خطأ أثناء إنشاء الأمر. حاول مرة أخرى.",
            { id: toastId },
          );
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء إنشاء الأمر. حاول مرة أخرى.", {
          id: toastId,
        });
        console.error(error);
      }
    }
  }, [form, router, isEditMode, orderDetails]);
  const selectedService = form.watch("ServiceId");
  const { service, isLoading: isLoadingService } = useService(selectedService);
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
        isEditMode,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
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
  const quantity = form.watch("Quantity") || 1;

  return (baseAmount - offerDiscount + agentCommission) * quantity;
}

export default OrderFromProvider;
