"use client";
import { createService, updateService } from "@/actions/services/actions";
import { useFormsServices } from "@/hooks/useFormsServices";
import { generateServiceSchema, ServiceValues } from "@/schema/service";
import { Service, ShortWorkFlow } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { ControllerRenderProps, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createFormField } from "../general/FormComponent";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Form, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
function ServiceForm({
  service,
  workFlows,
}: {
  service?: Service;
  workFlows: ShortWorkFlow[];
}) {
  const ServiceSchema = generateServiceSchema(workFlows);
  const form = useForm<ServiceValues>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: generateDefalutValues(service),
  });
  const { forms } = useFormsServices();
  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  const {
    fields: overheadFields,
    append: appendOverhead,
    remove: removeOverhead,
  } = useFieldArray({
    control: form.control,
    name: "overheads",
  });

  function handleNumberInputChange(
    field: ControllerRenderProps<ServiceValues>,
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numericValue = value === "" ? "" : Number(value);
      field.onChange(numericValue);
    };
  }

  const onSubmit = (data: ServiceValues) => {
    if (service) {
      updateService(data, service.id).then((res) => {
        if (res.success) {
          toast.success("تم تعديل الخدمة بنجاح");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      createService(data).then((res) => {
        if (res.success) {
          toast.success("تم إضافة الخدمة بنجاح");
          form.reset();
        } else {
          toast.error(res.message);
        }
      });
    }
  };
  const onSelectFormChange = useCallback(
    (value: "penalty" | "forms" | "adminFees", idx: number) => {
      form.setValue(`overheads.${idx}.value`, 0);
      form.setValue(`overheads.${idx}.penalty`, false);
      form.setValue(`overheads.${idx}.forms`, false);
      form.setValue(`overheads.${idx}.adminFees`, false);
      form.setValue(`overheads.${idx}.${value}`, true);
      if (form.getValues(`overheads.${idx}.forms`) === false) {
        form.setValue(`overheads.${idx}.formTypeID`, null);
      }
    },
    [form],
  );

  const overheadType = (index: number) => {
    if (form.getValues(`overheads.${index}.penalty`)) return "penalty";
    if (form.getValues(`overheads.${index}.forms`)) return "forms";
    if (form.getValues(`overheads.${index}.adminFees`)) return "adminFees";
    return "penalty";
  };

  const FormComponent = createFormField<ServiceValues>(form);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-[70vh] space-y-6 overflow-auto rounded-md">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
              <FormComponent
                name="name"
                label="اسم الخدمة"
                render={({ field }) => <Input {...field} />}
              />
              <FormComponent
                name="defaultFees"
                label="السعر الصافي للخدمة"
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    onChange={handleNumberInputChange(field)}
                  />
                )}
              />
              <FormComponent
                name="validityPeriodDays"
                label="مده الخدمه (بالأيام)"
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    onChange={handleNumberInputChange(field)}
                  />
                )}
              />
              <FormComponent
                name="expiryPeriodYears"
                label="فترة الصلاحية (بالسنوات)"
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    onChange={handleNumberInputChange(field)}
                  />
                )}
              />
              <FormComponent
                name="isCertificate"
                label="شهادة "
                className="flex items-center justify-between md:col-span-2"
                render={({ field }) => (
                  <Switch
                    className="flex-row-reverse"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>الوثائق المطلوبة</CardTitle>
              <Button
                type="button"
                variant="outline"
                onClick={() => appendDocument({ description: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                إضافة وثيقة
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormComponent
                      name={`documents.${index}.description`}
                      className="flex-1"
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="اسم الوثيقة"
                          {...field}
                        />
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflows */}
          <Card>
            <CardHeader>
              <CardTitle>سير العمل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workFlows.map((workflow) => (
                  <FormComponent
                    key={workflow.id}
                    name="workflows"
                    render={({ field }) => {
                      const selectedWorkflow = field.value.find(
                        (w) => w.orderStatusId === workflow.id,
                      );
                      const isSelected = !!selectedWorkflow;
                      return (
                        <div className="flex items-center space-x-3 rounded border p-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                const nextSequence = field.value.length + 1;
                                field.onChange([
                                  ...field.value,
                                  {
                                    orderStatusId: workflow.id,
                                    sequence: nextSequence,
                                  },
                                ]);
                              } else {
                                interface WorkflowItem {
                                  orderStatusId: number;
                                  sequence: number;
                                }

                                const updatedWorkflows: WorkflowItem[] =
                                  field.value
                                    .filter(
                                      (w: WorkflowItem) =>
                                        w.orderStatusId !== workflow.id,
                                    )
                                    .map((w: WorkflowItem, index: number) => ({
                                      ...w,
                                      sequence: index + 1,
                                    }));
                                field.onChange(updatedWorkflows);
                              }
                            }}
                          />
                          <FormLabel className="flex-1">
                            {workflow.name}
                          </FormLabel>
                          {isSelected && (
                            <span className="text-sm text-gray-500">
                              ترتيب: {selectedWorkflow.sequence}
                            </span>
                          )}
                        </div>
                      );
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overheads */}
          <Card>
            <CardHeader>
              <CardTitle>التكاليف الإضافية</CardTitle>
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
                      name={`overheads.${index}.value`}
                      render={({ field }) => (
                        <Input
                          type="text"
                          pattern="[0-9]*"
                          {...field}
                          disabled={form.getValues(`overheads.${index}.forms`)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      )}
                    />

                    {form.watch(`overheads.${index}.forms`) ? (
                      forms.length > 0 ? (
                        <FormComponent
                          label="اختر نوع الاستمارة"
                          name={`overheads.${index}.formTypeID`}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onValueChange={(value: string) => {
                                field.onChange(Number(value));
                                form.setValue(
                                  `overheads.${index}.value`,
                                  forms.find((f) => f.id === Number(value))
                                    ?.value || 0,
                                );
                              }}
                              value={field.value?.toString()}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="اختر نوع الاستمارة" />
                              </SelectTrigger>
                              <SelectContent>
                                {forms.map((el) => (
                                  <SelectItem
                                    key={el?.id}
                                    value={el?.id?.toString()}
                                  >
                                    {el.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      ) : (
                        <Input
                          type="text"
                          disabled
                          value={"لا توجد استمارات"}
                        />
                      )
                    ) : (
                      <FormComponent
                        label="اسم التكلفه"
                        name={`overheads.${index}.description`}
                        render={({ field }) => <Input type="text" {...field} />}
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <Label>نوع التكلفة</Label>
                      <Select
                        onValueChange={(
                          value: "penalty" | "forms" | "adminFees",
                        ) => onSelectFormChange(value, index)}
                        value={overheadType(index)}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                      className="self-center"
                      onClick={() => removeOverhead(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {form.watch(`overheads.${index}.penalty`) && (
                      <>
                        <FormComponent
                          name={`overheads.${index}.penaltyBankFeePrecentage`}
                          label="نسبة رسوم البنك للغرامة (%)"
                          render={({ field }) => (
                            <Input
                              type="number"
                              placeholder="نسبة رسوم البنك"
                              step="0.01"
                              min="0"
                              {...field}
                              value={field.value || 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          )}
                        />

                        <FormComponent
                          name={`overheads.${index}.penaltyExtraFee`}
                          label="الرسوم الإضافية للغرامة"
                          render={({ field }) => (
                            <Input
                              type="number"
                              placeholder="الرسوم الإضافية"
                              step="0.01"
                              min="0"
                              {...field}
                              value={field.value || 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          )}
                        />

                        <FormComponent
                          name={`overheads.${index}.relatedAgent`}
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
        </div>
        <Button type="submit" className="w-full">
          حفظ الخدمة
        </Button>
      </form>
    </Form>
  );
}
export default ServiceForm;
function generateDefalutValues(service: Service | undefined) {
  return {
    name: service?.name || "",
    defaultFees: service?.defaultFees || 0,
    validityPeriodDays: service?.validityPeriodDays || 0,
    expiryPeriodYears: service?.expiryPeriodYears || 0,
    isCertificate: service?.isCertificate || false,
    documents: service?.documents || [],
    workflows:
      service?.workflows.map((workflow) => ({
        orderStatusId: workflow.orderStatusId,
        sequence: workflow.sequence || 1,
      })) || [],
    overheads: service?.overheads || [],
  };
}
