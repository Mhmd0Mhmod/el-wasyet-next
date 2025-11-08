"use client";
import { createService, updateService } from "@/actions/services/actions";
import AddOverheadForm from "@/components/general/AddOverheadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generateServiceSchema, ServiceValues } from "@/schema/service";
import { Service, ShortWorkFlow } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const onSubmit = useCallback(
    (data: ServiceValues) => {
      const id = toast.loading("جاري الحفظ...", {
        duration: 60000,
      });
      if (service) {
        updateService(data, service.id)
          .then((res) => {
            if (res.success) {
              toast.success("تم تعديل الخدمة بنجاح", { id });
            } else {
              toast.error(res.message, { id });
            }
          })
          .catch((error) => {
            toast.error(`حدث خطأ: ${error}`, { id });
          });
      } else {
        createService(data)
          .then((res) => {
            if (res.success) {
              toast.success("تم إضافة الخدمة بنجاح", { id });
              form.reset();
            } else {
              toast.error(res.message, { id });
            }
          })
          .catch((error) => {
            toast.error(`حدث خطأ: ${error}`, { id });
          });
      }
    },
    [service, form],
  );

  console.log(form.getValues());
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
              <FormField
                name="Name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الخدمة</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="defaultFees"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرسوم الافتراضية</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={"any"}
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="validityPeriodDays"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فترة الصلاحية (بالأيام)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={"any"}
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="expiryPeriodYears"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فترة الصلاحية (بالسنوات)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={"any"}
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="isCertificate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between md:col-span-2">
                    <FormLabel>هل هذه الخدمة شهادة؟</FormLabel>
                    <FormControl>
                      <Switch
                        className="flex-row-reverse"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
                  <div
                    key={field.id}
                    className="flex w-full items-center gap-2"
                  >
                    <FormField
                      name={`documents.${index}.description`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>اسم الوثيقة</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="اسم الوثيقة"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-auto"
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
                  <FormField
                    key={workflow.id}
                    name="Workflows"
                    control={form.control}
                    render={({ field }) => {
                      const selectedWorkflow = field.value.find(
                        (w) => w.orderStatusId === workflow.id,
                      );
                      const isSelected = !!selectedWorkflow;
                      return (
                        <FormItem className="flex items-center space-x-3 rounded border p-3">
                          <FormControl>
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
                                      .map(
                                        (w: WorkflowItem, index: number) => ({
                                          ...w,
                                          sequence: index + 1,
                                        }),
                                      );
                                  field.onChange(updatedWorkflows);
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="flex-1">
                            {workflow.name}
                          </FormLabel>
                          {isSelected && (
                            <span className="text-sm text-gray-500">
                              ترتيب: {selectedWorkflow.sequence}
                            </span>
                          )}
                        </FormItem>
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
