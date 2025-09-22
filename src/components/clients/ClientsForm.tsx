"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  BranchClientValues,
  customerFormSchema,
  CustomerFormValues,
} from "@/schema/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User } from "lucide-react";
import { useForm } from "react-hook-form";
import Dialog from "../general/Dialog";
import AddBranchClient from "./AddBranchClient";
import BranchClientCard from "./BranchClientCard";

interface CustomerFormProps {
  initialData?: Partial<CustomerFormValues>;
  onSubmit?: (data: CustomerFormValues) => Promise<void>;
}

function CustomerForm({ initialData, onSubmit }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone1: initialData?.phone1 || "",
      phone2: initialData?.phone2 || "",
      address: initialData?.address || "",
      type: initialData?.type || "main",
      branchClients: initialData?.branchClients || [],
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
  const onAddBranchClient = (formData: BranchClientValues) => {
    const branchClients = form.getValues("branchClients") || [];
    form.setValue("branchClients", [...branchClients, formData]);
    console.log(form.getValues("branchClients"));
  };
  const onRemoveBranchClient = (index: number) => {
    const branchClients = form.getValues("branchClients") || [];
    const updatedClients = branchClients.filter((_, i) => i !== index);
    form.setValue("branchClients", updatedClients);
  };

  const branchClients = form.watch("branchClients") || [];
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
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الاسم الكامل" {...field} />
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
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="أدخل البريد الإلكتروني"
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
                    <FormLabel>رقم الهاتف 1</FormLabel>
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
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف 2</FormLabel>
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل العنوان الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Dialog>
            <Dialog.Trigger>
              <Button variant="outline" className="w-full">
                <Plus className="ml-2" />
                إضافة عميل فرعي
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="إضافة عميل فرعي">
              <div className="max-h-[60vh] overflow-auto">
                <AddBranchClient onSubmit={onAddBranchClient} />
              </div>
            </Dialog.Content>
          </Dialog>
          {branchClients.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="text-primary h-5 w-5" />
                  العملاء الفرعيين ({branchClients.length})
                </h3>
              </div>
              <div className="grid gap-4">
                {branchClients.map((client, index) => (
                  <BranchClientCard
                    key={index}
                    client={client}
                    index={index}
                    onRemove={onRemoveBranchClient}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-lg py-3",
                isLoading && "opacity-70",
              )}
            >
              {isLoading ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-lg py-3",
                isLoading && "opacity-70",
              )}
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
