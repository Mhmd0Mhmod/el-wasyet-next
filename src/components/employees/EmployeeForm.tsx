"use client";

import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  employeeFormSchema,
  EmployeeFormValues,
  PERMISSIONS_OPTIONS,
} from "@/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
interface EmployeeFormProps {
  initialData?: Partial<Employee>;
  disabled?: boolean;
  onSubmit?: (data: EmployeeFormValues) => Promise<void>;
  onCancel?: () => void;
}

function EmployeeForm({
  initialData,
  disabled = false,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    mode: "onChange",
    disabled,
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      role: initialData?.role || "",
      userName: initialData?.userName || "",
      managerName: initialData?.managerName || "",
      suspended: initialData?.suspended ?? false,
      abilityDTOs: initialData?.abilityDTOs || [],
    },
  });

  const handleSubmit = async (data: EmployeeFormValues) => {
    try {
      await onSubmit?.(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  const handleAbilityChange = (
    permission: (typeof PERMISSIONS_OPTIONS)[number],
    checked: boolean,
    currentValue: Ability[],
  ) => {
    return checked
      ? [
          ...currentValue,
          { id: permission.id, abilityName: permission.abilityName },
        ]
      : currentValue.filter((ability) => ability.id !== permission.id);
  };

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  const submitButtonText = initialData?.id ? "تحديث الموظف" : "إضافة موظف";

  return (
    <div dir="rtl" className="mx-auto max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوظيفة</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الوظيفة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المستخدم</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسم المستخدم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدير المباشر</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل اسم المدير المباشر"
                      {...field}
                      value={field.value || ""}
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
            name="suspended"
            render={({ field }) => (
              <FormItem>
                <FormLabel>حالة الموظف</FormLabel>
                <FormControl>
                  <RadioGroup dir="rtl">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem
                        value="active"
                        disabled={disabled}
                        checked={!field.value}
                        onClick={() => field.onChange(false)}
                        className="cursor-pointer"
                      />
                      <Label className="cursor-pointer text-sm">نشط</Label>

                      <RadioGroupItem
                        value="suspended"
                        disabled={disabled}
                        checked={field.value}
                        onClick={() => field.onChange(true)}
                        className="cursor-pointer"
                      />
                      <Label className="cursor-pointer text-sm">معلق</Label>
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
            name="abilityDTOs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الصلاحيات</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-6">
                    {PERMISSIONS_OPTIONS.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          disabled={disabled}
                          checked={field.value?.some(
                            (ability) => ability.id === permission.id,
                          )}
                          onCheckedChange={(checked) => {
                            const updatedAbilities = handleAbilityChange(
                              permission,
                              !!checked,
                              field.value || [],
                            );
                            field.onChange(updatedAbilities);
                          }}
                        />
                        <Label className="cursor-pointer text-sm">
                          {permission.abilityName}
                        </Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          {!disabled && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "جاري الحفظ..." : submitButtonText}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  إلغاء
                </Button>
              </DialogClose>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;
