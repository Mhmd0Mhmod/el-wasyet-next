"use client";

import { useCallback } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { createFormField } from "./FormComponent";
import { useFormsServices } from "@/hooks/useFormsServices";

interface AddOverheadFormProps {
  form: UseFormReturn;
  name: string;
  title?: string;
}

function AddOverheadForm({
  form,
  name,
  title = "التكاليف الإضافية",
}: AddOverheadFormProps) {
  const { forms } = useFormsServices();
  const {
    fields: overheadFields,
    append: appendOverhead,
    remove: removeOverhead,
  } = useFieldArray({
    control: form.control,
    name,
  });

  const FormComponent = createFormField(form);

  const onSelectFormChange = useCallback(
    (value: "penalty" | "forms" | "adminFees", idx: number) => {
      // Reset all type flags
      form.setValue(`${name}.${idx}.value`, 0);
      form.setValue(`${name}.${idx}.penalty`, false);
      form.setValue(`${name}.${idx}.forms`, false);
      form.setValue(`${name}.${idx}.adminFees`, false);
      form.setValue(`${name}.${idx}.${value}`, true);

      if (value !== "forms") {
        form.setValue(`${name}.${idx}.formTypeID`, null);
      }
    },
    [form, name],
  );

  const getOverheadType = (index: number) => {
    if (form.getValues(`${name}.${index}.penalty`)) return "penalty";
    if (form.getValues(`${name}.${index}.forms`)) return "forms";
    if (form.getValues(`${name}.${index}.adminFees`)) return "adminFees";
    return "penalty";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendOverhead({
              value: 0,
              description: "",
              penalty: true,
              forms: false,
              adminFees: false,
              penaltyBankFeePrecentage: 0,
              penaltyExtraFee: 0,
              relatedAgent: false,
              formTypeID: null,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          إضافة تكلفة
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {overheadFields.map((field, index) => (
            <div
              key={field.id}
              className="gap-2 space-y-4 rounded-lg border p-4 md:grid md:grid-cols-[repeat(3,1fr)_auto] md:space-y-0"
            >
              <FormComponent
                label="رسوم التكلفه"
                name={`${name}.${index}.value`}
                render={({ field }) => (
                  <Input
                    type="text"
                    pattern="[0-9]*"
                    {...field}
                    disabled={form.getValues(`${name}.${index}.forms`)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              {form.watch(`${name}.${index}.forms`) ? (
                forms.length > 0 ? (
                  <FormComponent
                    label="اختر نوع الاستمارة"
                    name={`${name}.${index}.formTypeID`}
                    className="w-full"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value: string) => {
                          field.onChange(Number(value));
                          form.setValue(
                            `${name}.${index}.value`,
                            forms.find((f) => f.id === Number(value))?.value ||
                              0,
                          );
                        }}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر نوع الاستمارة" />
                        </SelectTrigger>
                        <SelectContent>
                          {forms.map((el) => (
                            <SelectItem key={el?.id} value={el?.id?.toString()}>
                              {el.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : (
                  <Input type="text" disabled value={"لا توجد استمارات"} />
                )
              ) : (
                <FormComponent
                  label="اسم التكلفه"
                  name={`${name}.${index}.description`}
                  render={({ field }) => <Input type="text" {...field} />}
                />
              )}
              <div className="flex flex-col gap-2">
                <Label>نوع التكلفة</Label>
                <Select
                  onValueChange={(value: "penalty" | "forms" | "adminFees") =>
                    onSelectFormChange(value, index)
                  }
                  value={getOverheadType(index)}
                  dir="rtl"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر نوع التكلفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="penalty">غرامة</SelectItem>
                    <SelectItem value="forms">استمارات</SelectItem>
                    <SelectItem value="adminFees">رسوم ادارية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-5 self-center"
                onClick={() => removeOverhead(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {form.watch(`${name}.${index}.penalty`) && (
                <>
                  <FormComponent
                    name={`${name}.${index}.penaltyBankFeePrecentage`}
                    label="نسبة رسوم البنك للغرامة (%)"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="نسبة رسوم البنك"
                        step="0.01"
                        min="0"
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />

                  <FormComponent
                    name={`${name}.${index}.penaltyExtraFee`}
                    label="الرسوم الإضافية للغرامة"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="الرسوم الإضافية"
                        step="0.01"
                        min="0"
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />

                  <FormComponent
                    name={`${name}.${index}.relatedAgent`}
                    label="وكيل مرتبط"
                    className="col-span-2 flex items-center justify-between"
                    render={({ field }) => (
                      <Switch
                        className="flex-row-reverse"
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AddOverheadForm;
