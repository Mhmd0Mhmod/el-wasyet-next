"use client";

import { getFullURL } from "@/lib/helper";
import Link from "next/link";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { Button } from "../../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

function FinancialDetailsForm() {
  const { agents, offers, form } = useOrderForm();
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
      <div>
        <Select
          onValueChange={(value) =>
            form.setValue("OfferId", value ? parseInt(value) : undefined)
          }
          value={form.watch("OfferId")?.toString() || ""}
        >
          <SelectTrigger className="w-full" dir="rtl">
            <SelectValue placeholder="اختر خصم الشركات والنقابات" />
          </SelectTrigger>
          <SelectContent className="space-y-10">
            <Button
              variant={"link"}
              className="ml-auto block cursor-pointer text-xs text-gray-400"
              onClick={() => form.setValue("OfferId", undefined)}
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
      </div>
      {form.watch("OfferId") && (
        <div>
          <FormField
            control={form.control}
            name="ImageUrlForOffer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  يرجى تحميل صورة عرض السعر المرتبط بالخصم
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("imageurlStringForOffer") && (
            <Link
              href={getFullURL(form.watch("imageurlStringForOffer")!)}
              target="_blank"
              className="text-primary text-sm underline"
            >
              عرض الصوره
            </Link>
          )}
        </div>
      )}
      <div>
        <Select
          onValueChange={(value) =>
            form.setValue("AgentId", value ? parseInt(value) : undefined)
          }
          value={form.watch("AgentId")?.toString() || ""}
        >
          <SelectTrigger className="w-full" dir="rtl">
            <SelectValue placeholder="زياده الوكلاء" />
          </SelectTrigger>
          <SelectContent>
            <Button
              variant={"link"}
              className="ml-auto block cursor-pointer text-xs text-gray-400"
              onClick={() => form.setValue("AgentId", undefined)}
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
      </div>
    </div>
  );
}
export default FinancialDetailsForm;
