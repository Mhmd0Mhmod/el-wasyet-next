"use client";

import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { OrderFormField } from "../providers/OrderFormProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FinancialDetailsForm() {
  const { agents, isLoadingAgents } = useAgents();
  const { offers, isLoadingOffers } = useOffers();
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
          >
            <SelectTrigger className="w-full" dir="rtl">
              <SelectValue placeholder="اختر خصم الشركات والنقابات" />
            </SelectTrigger>
            <SelectContent>
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
