"use client";
import { createNewStockItem, updateStockItem } from "@/actions/stock/actions";
import Dialog from "@/components/shared/Dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStockBranches from "@/hooks/use-stock-branches";
import useStockForms from "@/hooks/use-stock-forms";
import { StockItemForm, StockItemFormSchema } from "@/schema/stock-item-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import NewFormType from "./new-form-type";

function NewForm({ form: initialForm }: { form?: StockItemForm }) {
  const isEditMode = Boolean(initialForm);
  const form = useForm<StockItemForm>({
    resolver: zodResolver(StockItemFormSchema),
    defaultValues: initialForm || {
      branchId: undefined,
      formTypeId: undefined,
      quantity: 0,
      minimumThreshold: 0,
    },
  });
  const { data: stockBranches, isLoading: isLoadingBranches } =
    useStockBranches();
  const {
    data: stockForms,
    isLoading: isLoadingForms,
    refetch: refetchForms,
  } = useStockForms();

  const onSubmit = useCallback(
    async (data: StockItemForm) => {
      const id = toast.loading("جاري الحفظ...");
      try {
        if (isEditMode) {
          const response = await updateStockItem(data);
          if (response.success) {
            toast.success("تم التحديث بنجاح", { id });
          } else {
            toast.error(`حدث خطأ: ${response.message}`, { id });
          }
        } else {
          const response = await createNewStockItem(data);
          if (response.success) {
            toast.success("تم الحفظ بنجاح", { id });
            form.reset();
          } else {
            toast.error(`حدث خطأ: ${response.message}`, { id });
          }
        }
      } catch (error) {
        toast.error(
          `حدث خطأ: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
          { id },
        );
      }
    },
    [isEditMode, form],
  );
  const onAddNewFormType = useCallback(
    function () {
      refetchForms();
    },
    [refetchForms],
  );
  return (
    <div className="space-y-6">
      <Dialog>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="branchId">الفرع</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                      disabled={isLoadingBranches}
                    >
                      <SelectTrigger className="w-full" dir="rtl" id="branchId">
                        <SelectValue placeholder="اختر الفرع" />
                      </SelectTrigger>
                      <SelectContent>
                        {stockBranches?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id.toString()}
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="formTypeId">الاستمارات</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                      disabled={isLoadingForms}
                    >
                      <SelectTrigger
                        className="w-full"
                        dir="rtl"
                        id="formTypeId"
                      >
                        <SelectValue placeholder="اختر الاستمارة" />
                      </SelectTrigger>
                      <SelectContent>
                        <Dialog.Trigger>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-primary w-full cursor-pointer hover:underline"
                          >
                            إضافة استماره جديده
                            <PlusCircle className="ml-2" />
                          </Button>
                        </Dialog.Trigger>
                        {stockForms?.map((form) => (
                          <SelectItem key={form.id} value={form.id.toString()}>
                            {form.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="quantity">الكمية</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="any"
                      {...field}
                      value={field.value?.toString()}
                      onChange={(value) =>
                        field.onChange(parseFloat(value.target.value))
                      }
                      id="quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minimumThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="minimumThreshold">
                    الحد الأدنى للتنبيه
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="any"
                      {...field}
                      value={field.value?.toString()}
                      onChange={(value) =>
                        field.onChange(parseFloat(value.target.value))
                      }
                      id="minimumThreshold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEditMode && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>سعر الاستمارة</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="اكتب سعر الاستمارة"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="col-span-2 flex justify-end">
              <Button type="submit">حفظ</Button>
            </div>
          </form>
        </Form>

        <Dialog.Content title="إضافة نوع استماره جديده">
          <NewFormType onAdded={onAddNewFormType} />
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
export default NewForm;
