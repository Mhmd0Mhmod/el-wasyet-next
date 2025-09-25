"use client";

import { createClient, updateClient } from "@/actions/clients/actions";
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
  clientFormSchema,
  ClientFormValues,
} from "@/schema/client";
import { Client } from "@/types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Dialog from "../general/Dialog";
import { DialogClose } from "../ui/dialog";
import AddBranchClient from "./AddBranchClient";
import BranchClientCard from "./BranchClientCard";

interface ClientFormProps {
  initialData?: Partial<ClientFormValues> & Client;
}

function ClientForm({ initialData }: ClientFormProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone1: initialData?.phone1 || "",
      phone2: initialData?.phone2 || "",
      address: initialData?.address || "",
      type: initialData?.type || "main",
      childClients: initialData?.childClients || [],
    },
  });

  const handleSubmit = async (data: ClientFormValues) => {
    if (initialData?.id) {
      updateClient(initialData.id, data)
        .then(() => toast.success("تم تحديث بيانات العميل بنجاح"))
        .catch((err) => toast.error(err.message));
    } else {
      createClient(data)
        .then(() => {
          toast.success("تم إضافة العميل بنجاح");
          form.reset();
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const handleCancel = () => {
    form.reset();
  };
  const onAddChildClient = (formData: BranchClientValues) => {
    const childClients = form.getValues("childClients") || [];
    form.setValue("childClients", [...childClients, formData]);
    dialogCloseRef.current?.click();
  };
  const onRemoveChildClient = (index: number) => {
    const childClients = form.getValues("childClients") || [];
    const updatedClients = childClients.filter((_, i) => i !== index);
    form.setValue("childClients", updatedClients);
  };

  const childClients = form.watch("childClients") || [];
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
                name="name"
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
                <AddBranchClient onSubmit={onAddChildClient} />
              </div>
              <DialogClose className="hidden" ref={dialogCloseRef} />
            </Dialog.Content>
          </Dialog>
          {childClients.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="text-primary h-5 w-5" />
                  العملاء الفرعيين ({childClients.length})
                </h3>
              </div>
              <div className="grid gap-4">
                {childClients.map((client, index) => (
                  <BranchClientCard
                    key={index}
                    client={client}
                    index={index}
                    onRemove={onRemoveChildClient}
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

export default ClientForm;
