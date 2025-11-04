"use client";
import { createService, updateService } from "@/actions/services/actions";
import { generateServiceSchema, ServiceValues } from "@/schema/service";
import { Service, ShortWorkFlow } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { ControllerRenderProps, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import AddOverheadForm from "../general/AddOverheadForm";
import { createFormField } from "../general/FormComponent";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Form, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
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
    defaultValues: generateDefaultValues(service),
  });
  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control: form.control,
    name: "documents",
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
                name="Name"
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
                    name="Workflows"
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
          <AddOverheadForm name="overheads" title="التكاليف الإضافية" />
        </div>
        <Button type="submit" className="w-full">
          حفظ الخدمة
        </Button>
      </form>
    </Form>
  );
}
export default ServiceForm;
function generateDefaultValues(service: Service | undefined) {
  return {
    Name: service?.name || "",
    defaultFees: service?.defaultFees || 0,
    validityPeriodDays: service?.validityPeriodDays || 0,
    expiryPeriodYears: service?.expiryPeriodYears || 0,
    isCertificate: service?.isCertificate || false,
    documents: service?.documents || [],
    Workflows:
      service?.workflows.map((workflow) => ({
        orderStatusId: workflow.orderStatusId,
        sequence: workflow.sequence || 1,
      })) || [],
    overheads: service?.overheads || [],
  };
}
