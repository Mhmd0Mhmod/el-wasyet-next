"use client";

import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
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

function FinancialDetailsForm() {
  const { agents, isLoadingAgents, isLoadingOffers, offers, form } =
    useOrderForm();

  const resetSelect = (type: "offer" | "agent") => {
    form.setValue(type === "offer" ? "OfferId" : "AgentId", undefined);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        {isLoadingOffers ? (
          <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        ) : (
          <FormField
            control={form.control}
            name="OfferId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value ? parseInt(value) : undefined)
                    }
                    value={field.value?.toString() || ""}
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
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      <div>
        {isLoadingAgents ? (
          <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        ) : (
          <FormField
            control={form.control}
            name="AgentId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value ? parseInt(value) : undefined)
                    }
                    value={field.value?.toString() || ""}
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
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}
export default FinancialDetailsForm;
