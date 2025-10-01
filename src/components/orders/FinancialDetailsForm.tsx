"use client";

import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

function FinancialDetailsForm() {
  const form = useOrderForm();
  const { agents, isLoadingAgents } = useAgents();
  const { offers, isLoadingOffers } = useOffers();
  const resetSelect = (type: "offer" | "agent") => {
    form.setValue(type === "offer" ? "OfferId" : "AgentId", undefined);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        {isLoadingOffers ? (
          <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        ) : (
          <div>
            <Select
              value={form.watch("OfferId")?.toString() || ""}
              onValueChange={(value) =>
                form.setValue("OfferId", value ? parseInt(value) : undefined)
              }
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
            {form.formState.errors.OfferId && (
              <p className="text-sm text-red-600">
                {form.formState.errors.OfferId.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {isLoadingAgents ? (
          <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        ) : (
          <div>
            <Select
              value={form.watch("AgentId")?.toString() || ""}
              onValueChange={(value) =>
                form.setValue("AgentId", value ? parseInt(value) : undefined)
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
            {form.formState.errors.AgentId && (
              <p className="text-sm text-red-600">
                {form.formState.errors.AgentId.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default FinancialDetailsForm;
