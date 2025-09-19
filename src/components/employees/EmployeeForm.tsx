"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

const employeeFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "الاسم الكامل يجب أن يحتوي على حرفين على الأقل" })
    .max(100, { message: "الاسم الكامل يجب ألا يزيد عن 100 حرف" }),
  email: z
    .string()
    .email({ message: "البريد الإلكتروني غير صحيح" })
    .min(1, { message: "البريد الإلكتروني مطلوب" }),
  phoneNumber: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف يجب ألا يزيد عن 15 رقم" })
    .regex(/^[\d+\-\s()]+$/, { message: "رقم الهاتف غير صحيح" }),
  jobTitle: z
    .string()
    .min(2, { message: "الوظيفة يجب أن تحتوي على حرفين على الأقل" })
    .max(50, { message: "الوظيفة يجب ألا تزيد عن 50 حرف" }),
  username: z
    .string()
    .min(3, { message: "اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل" })
    .max(30, { message: "اسم المستخدم يجب ألا يزيد عن 30 حرف" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط",
    }),
  manager: z
    .string()
    .min(2, { message: "المدير المباشر يجب أن يحتوي على حرفين على الأقل" })
    .max(100, { message: "المدير المباشر يجب ألا يزيد عن 100 حرف" }),
  isActive: z.boolean(),
  permissions: z
    .array(z.string())
    .min(1, { message: "يجب اختيار صلاحية واحدة على الأقل" }),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const PERMISSIONS_OPTIONS = [
  { id: "download", label: "التحميل" },
  { id: "review", label: "المراجعة" },
  { id: "manage_receipts", label: "إدارة الفواتير" },
] as const;

interface EmployeeFormProps {
  initialData?: Partial<EmployeeFormValues>;
  isLoading?: boolean;
}

function EmployeeForm({ initialData }: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phoneNumber: initialData?.phoneNumber || "",
      jobTitle: initialData?.jobTitle || "",
      username: initialData?.username || "",
      manager: initialData?.manager || "",
      isActive: initialData?.isActive ?? true,
      permissions: initialData?.permissions || [],
    },
  });

  const handleSubmit = async (data: EmployeeFormValues) => {
    try {
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };
  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  const submitButtonText = initialData ? "تحديث الموظف" : "إضافة موظف";
  return (
    <div dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">الاسم الكامل</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
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
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">الوظيفة</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل الوظيفة"
                      className="text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">اسم المستخدم</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل اسم المستخدم"
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
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">المدير المباشر</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل اسم المدير المباشر"
                      className="text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status Section */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    dir="rtl"
                    value={field.value ? "active" : "inactive"}
                    onValueChange={(value) =>
                      field.onChange(value === "active")
                    }
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="active" id="active" />
                      <Label
                        htmlFor="active"
                        className="cursor-pointer text-sm"
                      >
                        الموظف نشط
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Permissions Section */}
          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-right text-sm text-gray-500">
                  الصلاحيات
                </FormLabel>
                <div className="flex flex-wrap gap-6">
                  {PERMISSIONS_OPTIONS.map((permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-y-0 space-x-3 space-x-reverse">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                const updatedPermissions = checked
                                  ? [...(field.value || []), permission.id]
                                  : field.value?.filter(
                                      (value) => value !== permission.id,
                                    ) || [];
                                field.onChange(updatedPermissions);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm font-normal">
                            {permission.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
            <Button type="submit" disabled={isLoading} className="min-w-24">
              {isLoading ? "جاري الحفظ..." : submitButtonText}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;
