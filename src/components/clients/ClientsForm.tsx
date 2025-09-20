"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { customerFormSchema, CustomerFormValues } from "@/schema/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CustomerFormProps {
  initialData?: Partial<CustomerFormValues>;
  onSubmit?: (data: CustomerFormValues) => Promise<void>;
}

function CustomerForm({ initialData, onSubmit }: CustomerFormProps) {
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone1: initialData?.phone1 || "",
      phone2: initialData?.phone2 || "",
      address: initialData?.address || "",
      type: initialData?.type || "main",
      additionalCustomer: {
        fullName: "",
        email: "",
        phone1: "",
        phone2: "",
        address: "",
      },
    },
  });

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      await onSubmit?.(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div
      dir="rtl"
      className="mx-auto max-h-[80vh] max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-sm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Main Customer Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right text-gray-700">
                      الاسم الكامل
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل الاسم الكامل"
                        className="border-gray-300 text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right text-gray-700">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="أدخل البريد الإلكتروني"
                        className="border-gray-300 text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right text-gray-700">
                      رقم الهاتف 1
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="أدخل رقم الهاتف الأول"
                        className="border-gray-300 text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right text-gray-700">
                      رقم الهاتف 2
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="أدخل رقم الهاتف الثاني"
                        className="border-gray-300 text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right text-gray-700">
                    العنوان
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل العنوان الكامل"
                      className="border-gray-300 text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Selection */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right text-gray-700">
                    نوع العميل
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex justify-center gap-8"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="main" id="main" />
                        <Label htmlFor="main" className="cursor-pointer">
                          رئيسي
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="branch" id="branch" />
                        <Label htmlFor="branch" className="cursor-pointer">
                          فرعي
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Collapsible Additional Customer Section */}
          <Collapsible
            open={isAdditionalOpen}
            onOpenChange={setIsAdditionalOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="default"
                className={cn(
                  "w-full rounded-lg bg-blue-600 py-3 text-white transition-all duration-200 hover:bg-blue-700",
                  "flex items-center justify-center gap-2",
                )}
              >
                <Plus className="h-4 w-4" />
                <span>إضافة عميل مفترض</span>
                {isAdditionalOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-6 space-y-4 rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 text-right text-lg font-medium text-gray-800">
                بيانات العميل الإضافي
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="additionalCustomer.fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right text-gray-700">
                        الاسم الكامل
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل الاسم الكامل"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalCustomer.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right text-gray-700">
                        البريد الإلكتروني
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="أدخل البريد الإلكتروني"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="additionalCustomer.phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right text-gray-700">
                        رقم الهاتف 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="أدخل رقم الهاتف الأول"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalCustomer.phone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right text-gray-700">
                        رقم الهاتف 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="أدخل رقم الهاتف الثاني"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additionalCustomer.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right text-gray-700">
                      العنوان
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل العنوان الكامل"
                        className="text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              {isLoading ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 rounded-lg border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CustomerForm;
