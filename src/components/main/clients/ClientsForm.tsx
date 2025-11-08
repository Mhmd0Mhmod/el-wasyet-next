"use client";

import { createClient, updateClient } from "@/actions/clients/actions";
import Loading from "@/app/(query)/loading";
import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClient } from "@/hooks/useClient";
import { cn } from "@/lib/utils";
import {
  BranchClientValues,
  clientFormSchema,
  ClientFormValues,
} from "@/schema/client";
import { Client } from "@/types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddBranchClient from "./AddBranchClient";
import BranchClientCard from "./BranchClientCard";

interface ClientFormProps {
  clientId?: number;
  onSubmit?: (client: ClientFormValues) => void;
}

function ClientForm({ clientId, onSubmit: onFormSubmit }: ClientFormProps) {
  const { client, isLoading: isLoadingClient } = useClient(clientId!);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: generateDefaultValues(),
  });
  useEffect(() => {
    if (client?.id) {
      form.reset(generateDefaultValues(client));
    }
  }, [client, form]);

  const handleSubmit = useCallback(
    async (data: ClientFormValues) => {
      const id = toast.loading("جاري حفظ بيانات العميل...", {
        duration: 5000,
      });
      console.log(data);

      if (client?.id) {
        updateClient(data)
          .then((res) => {
            if (res.success) {
              toast.success("تم تحديث بيانات العميل بنجاح", { id });
            } else {
              toast.error(res.message, { id });
            }
          })
          .catch(() => {
            toast.error("حدث خطأ أثناء تحديث بيانات العميل", { id });
          });
      } else {
        createClient(data)
          .then((res) => {
            if (res.success) {
              toast.success("تم إضافة العميل بنجاح", { id });
              form.reset();
            } else {
              toast.error(res.message, { id });
            }
          })
          .catch(() => {
            toast.error("حدث خطأ أثناء إضافة العميل", { id });
          });
      }
      onFormSubmit?.(data);
    },
    [client, onFormSubmit, form],
  );
  if (isLoadingClient) {
    return <Loading />;
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(handleSubmit)();
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

  const childClients = [...(form.watch("updateClientChildDTOs") || [])].concat(
    ...(form.watch("childClients") || []),
  );
  const isLoading = form.formState.isSubmitting;

  return (
    <div
      dir="rtl"
      className="mx-auto max-h-[80vh] max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-sm"
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
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
                        value={field.value ?? ""}
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

function generateDefaultValues(client?: Client): ClientFormValues {
  return {
    id: client?.id ?? null,
    name: client?.name ?? "",
    email: client?.email ?? null,
    phone1: client?.phone1 ?? "",
    phone2: client?.phone2 ?? "",
    address: client?.address ?? "",
    childClients: [],
    updateClientChildDTOs:
      client?.childClients?.map((child) => ({
        id: child.id,
        name: child.name,
        email: child.email,
        phone1: child.phone1,
        phone2: child.phone2,
        address: child.address,
      })) ?? [],
  };
}
