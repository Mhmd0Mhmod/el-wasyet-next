"use client";
import { createEmployee, updateEmployee } from "@/actions/employee/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAbilities from "@/hooks/useAbilities";
import { useManagers } from "@/hooks/useManagers";
import { useRoles } from "@/hooks/useRoles";
import { employeeFormSchema, EmployeeFormValues } from "@/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createFormField } from "../general/FormComponent";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
interface EmployeeFormProps {
  initialData?: Partial<Employee>;
  disabled?: boolean;
}

function EmployeeForm({ initialData, disabled = false }: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    disabled,
    resolver: zodResolver(employeeFormSchema),
    defaultValues: generateDefaultValues(initialData),
  });
  const { data: managers } = useManagers();
  const { roles } = useRoles();
  const currentRole = form.watch("roleId");
  const role = roles?.find((r) => r.id.toString() === currentRole);
  const { abilities } = useAbilities(role!);

  const handleSubmit = async (data: EmployeeFormValues) => {
    if (disabled) return;
    // console.log("Form submitted:", data);
    // return;
    if (initialData?.id) {
      updateEmployee(initialData.id, data)
        .then(() => {
          toast.success("تم تحديث الموظف بنجاح");
        })
        .catch((err) => {
          toast.error(err.message || "حدث خطأ أثناء تحديث الموظف");
        });
    } else {
      createEmployee(data)
        .then(() => toast.success("تم إضافة الموظف بنجاح"))
        .catch((err) => {
          toast.error(err.message || "حدث خطأ أثناء إضافة الموظف");
        });
    }
  };

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  const submitButtonText = initialData?.id ? "تحديث الموظف" : "إضافة موظف";

  const handleAbilityChange = (
    abilityId: number,
    checked: boolean,
    field: ControllerRenderProps<EmployeeFormValues, "abilityIds">,
  ) => {
    const currentAbilities = form.getValues("abilityIds") || [];
    console.log(currentAbilities);

    if (checked) {
      const abilityToAdd = abilities?.find((a) => a.id === abilityId);
      if (abilityToAdd) {
        field.onChange([...currentAbilities, abilityToAdd.id]);
      }
    } else {
      field.onChange(currentAbilities.filter((a) => a !== abilityId));
    }
  };
  function onSelectRole(value: string) {
    form.setValue("roleId", value);
    form.setValue("abilityIds", []);
    form.setValue("managerId", null);
  }

  const FormFieldWrapper = createFormField<EmployeeFormValues>(form);
  const disabledManagers =
    form.watch("roleId") === "" ||
    form.watch("roleId") === roles[0]?.id.toString(); // Set to true as per requirements
  return (
    <div dir="rtl" className="mx-auto max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormFieldWrapper
              label="الاسم بالكامل"
              name="name"
              render={({ field }) => (
                <Input placeholder="أدخل الاسم الكامل" {...field} />
              )}
            />
            <FormFieldWrapper
              name="email"
              label="البريد الالكتروني"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  {...field}
                />
              )}
            />
            <FormFieldWrapper
              name="phone"
              label="رقم الهاتف"
              render={({ field }) => (
                <Input type="tel" placeholder="أدخل رقم الهاتف" {...field} />
              )}
            />
            <FormFieldWrapper
              label="الوظيفه"
              name="roleId"
              render={({ field }) => (
                <Select
                  disabled={roles.length === 0}
                  onValueChange={onSelectRole}
                  {...field}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"اختار الوظيفه"} />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {roles?.map((role) => (
                      <SelectItem value={role.id?.toString()} key={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormFieldWrapper
              name="managerId"
              className="col-span-2"
              label="المدير المباشر"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  {...field}
                  disabled={disabledManagers}
                  value={field.value ?? undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختار المدير المباشر" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {managers?.map((manager) => (
                      <SelectItem
                        value={manager.id?.toString()}
                        key={manager.id}
                      >
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormFieldWrapper
              name="userName"
              label="اسم المستخدم"
              render={({ field }) => (
                <Input placeholder="أدخل اسم المستخدم" {...field} />
              )}
            />
            <FormFieldWrapper
              name="password"
              label="كلمة المرور"
              render={({ field }) => (
                <Input
                  placeholder="أدخل كلمة المرور"
                  type="password"
                  {...field}
                />
              )}
            />
          </div>

          {/* Status Section */}
          <FormFieldWrapper
            className="flex justify-between"
            name="suspended"
            label={`حالة الوقوف: ${form.watch("suspended") ? "متوقف" : "نشط"}`}
            render={({ field }) => (
              <Switch
                className="flex-row-reverse"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
              />
            )}
          />
          <FormFieldWrapper
            className="flex justify-between"
            name="hasViewCashBoxAbility"
            label={`حالة عرض صندوق النقد: ${form.watch("hasViewCashBoxAbility") ? "مفعل" : "معطل"}`}
            render={({ field }) => (
              <Switch
                className="flex-row-reverse"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
              />
            )}
          />

          {/* Permissions Section */}
          <FormFieldWrapper
            label="الصلاحيات"
            name="abilityIds"
            render={({ field }) => (
              <div className="flex flex-wrap gap-6">
                {abilities.length > 0 ? (
                  abilities.map((permission) => {
                    return (
                      <div
                        key={permission.id}
                        className="flex flex-wrap items-center"
                      >
                        <Checkbox
                          checked={field.value.some(
                            (ability) => ability === permission.id,
                          )}
                          id={permission.id.toString()}
                          disabled={field.disabled}
                          value={permission.id.toString()}
                          onCheckedChange={(checked) =>
                            handleAbilityChange(
                              permission.id,
                              checked as boolean,
                              field,
                            )
                          }
                        />
                        <Label
                          htmlFor={permission.id.toString()}
                          className="mr-2"
                        >
                          {permission.abilityName}
                        </Label>
                      </div>
                    );
                  })
                ) : !role ? (
                  <p className="text-sm text-gray-500">
                    يرجى اختيار الوظيفه لعرض الصلاحيات المتاحة.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    لا توجد صلاحيات متاحة لهذه الوظيفه.
                  </p>
                )}
              </div>
            )}
          />

          {/* Action Buttons */}
          {!disabled && (
            <>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "جاري الحفظ..." : submitButtonText}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;

function generateDefaultValues(
  initialData?: Partial<Employee>,
): EmployeeFormValues {
  return {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    roleId: initialData?.role || "",
    password: "",
    userName: initialData?.userName || "",
    managerId: initialData?.managerName || null,
    suspended: initialData?.suspended ?? false,
    abilityIds: initialData?.abilityDTOs?.map((a) => a.id) || [],
  };
}
