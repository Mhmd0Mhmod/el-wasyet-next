"use client";

import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { OrderFormField, useOrderForm } from "../providers/OrderFormProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

function FinancialDetailsForm() {
  const form = useOrderForm();
  const { agents, isLoadingAgents } = useAgents();
  const { offers, isLoadingOffers } = useOffers();
  const resetSelect = (type: "offer" | "agent") => {
    form.setValue(type === "offer" ? "OfferId" : "AgentId", undefined);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <OrderFormField
        name="OfferId"
        isLoading={isLoadingOffers}
        render={({ field }) => (
          <Select
            value={field.value?.toString()}
            onValueChange={(value) =>
              field.onChange(value ? parseInt(value) : undefined)
            }
            defaultValue=""
          >
            <SelectTrigger className="w-full" dir="rtl">
              <SelectValue placeholder="اختر خصم الشركات والنقابات" />
            </SelectTrigger>
            <SelectContent className="space-y-10">
              <Button
                variant={"link"}
                className="ml-auto block cursor-pointer text-xs text-gray-400"
                onClick={() => resetSelect("offer")}
              >
                ألغاء الخصم
              </Button>
              {offers?.map((offer) => (
                <SelectItem
                  key={offer.offerId}
                  value={offer.offerId.toString()}
                  disabled={!offer.isActive}
                >
                  {offer.companyName} ({offer.discountPercentage}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <OrderFormField
        name="AgentId"
        isLoading={isLoadingAgents}
        render={({ field }) => (
          <Select
            value={field.value?.toString()}
            onValueChange={(value) =>
              field.onChange(value ? parseInt(value) : undefined)
            }
          >
            <SelectTrigger className="w-full" dir="rtl">
              <SelectValue placeholder="زياده الوكلاء" />
            </SelectTrigger>
            <SelectContent>
              <Button
                variant={"link"}
                className="ml-auto block cursor-pointer text-xs text-gray-400"
                onClick={() => resetSelect("agent")}
              >
                ألغاء الوكيل
              </Button>
              {agents?.map((agent) => (
                <SelectItem key={agent.id} value={agent.id.toString()}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
export default FinancialDetailsForm;
