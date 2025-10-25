"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStockBranches from "@/hooks/use-stock-branches";
import useStockForms from "@/hooks/use-stock-forms";
import { StockItem, StockItemFormSchema } from "@/types/stock-item";
import { useCallback } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { PlusIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createNewStockItem } from "@/actions/stock/actions";
import { useRouter } from "next/navigation";

function NewForm({ form: initialForm }: { form?: StockItem }) {
  const form = useForm<StockItemFormSchema>({
    defaultValues: initialForm || {
      branchId: undefined,
      forms: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "forms",
  });
  const { data: stockBranches } = useStockBranches();
  const { data: stockForms } = useStockForms();

  const addNewForm = useCallback(() => {
    append({
      quantity: 0,
      minimumThreshold: 0,
      price: 0,
    });
  }, [append]);
  const onSubmit = useCallback(
    (data: StockItemFormSchema) => {
      const id = toast.loading("جاري الحفظ...");
      if (initialForm) {
      } else {
        createNewStockItem(data)
          .then((response) => {
            if (response.success) {
              toast.success("تم الحفظ بنجاح", { id });
              form.reset();
            } else {
              toast.error(`حدث خطأ: ${response.message}`, { id });
            }
          })
          .catch((error) => {
            toast.error(`حدث خطأ: ${error.message}`, { id });
          });
      }
    },
    [initialForm, form],
  );
  const branchId = form.watch("branchId");

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Branch Selection */}
        <div className="space-y-2">
          <Label htmlFor="branchId">الفرع</Label>
          <Controller
            name="branchId"
            control={form.control}
            rules={{ required: "يرجى اختيار الفرع" }}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
                dir="rtl"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {stockBranches?.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.branchId && (
            <p className="text-sm text-red-500">
              {form.formState.errors.branchId.message}
            </p>
          )}
        </div>

        {/* Forms Section */}
        <div className="max-h-[50vh] space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">الاستمارات</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!branchId}
              onClick={addNewForm}
            >
              <PlusIcon className="ml-2 h-4 w-4" />
              إضافة استمارة
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    استمارة {index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Form Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor={`forms.${index}.formTypeId`}>
                    نوع الاستمارة
                  </Label>
                  <Controller
                    name={`forms.${index}.formTypeId`}
                    control={form.control}
                    rules={{ required: "يرجى اختيار نوع الاستمارة" }}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                        dir="rtl"
                      >
                        <SelectTrigger
                          className="w-full"
                          id={`forms.${index}.formTypeId`}
                        >
                          <SelectValue placeholder="اختر نوع الاستمارة" />
                        </SelectTrigger>
                        <SelectContent>
                          {stockForms?.map((formType) => (
                            <SelectItem
                              key={formType.id}
                              value={formType.id.toString()}
                            >
                              {formType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.forms?.[index]?.formTypeId && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.forms[index]?.formTypeId?.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor={`forms.${index}.quantity`}>الكمية</Label>
                  <Input
                    id={`forms.${index}.quantity`}
                    type="number"
                    min="0"
                    {...form.register(`forms.${index}.quantity`, {
                      required: "يرجى إدخال الكمية",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "الكمية يجب أن تكون أكبر من 0",
                      },
                    })}
                  />
                  {form.formState.errors.forms?.[index]?.quantity && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.forms[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                {/* Minimum Threshold */}
                <div className="space-y-2">
                  <Label htmlFor={`forms.${index}.minimumThreshold`}>
                    الحد الأدنى
                  </Label>
                  <Input
                    id={`forms.${index}.minimumThreshold`}
                    type="number"
                    min="0"
                    {...form.register(`forms.${index}.minimumThreshold`, {
                      required: "يرجى إدخال الحد الأدنى",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "الحد الأدنى يجب أن يكون أكبر من 0",
                      },
                    })}
                  />
                  {form.formState.errors.forms?.[index]?.minimumThreshold && (
                    <p className="text-sm text-red-500">
                      {
                        form.formState.errors.forms[index]?.minimumThreshold
                          ?.message
                      }
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor={`forms.${index}.price`}>السعر</Label>
                  <Input
                    id={`forms.${index}.price`}
                    type="number"
                    min="0"
                    step="0.01"
                    {...form.register(`forms.${index}.price`, {
                      required: "يرجى إدخال السعر",
                      valueAsNumber: true,
                      min: { value: 0, message: "السعر يجب أن يكون أكبر من 0" },
                    })}
                  />
                  {form.formState.errors.forms?.[index]?.price && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.forms[index]?.price?.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default NewForm;
