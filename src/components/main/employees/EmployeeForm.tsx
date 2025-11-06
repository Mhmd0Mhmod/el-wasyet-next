"use client";
import { createEmployee, updateEmployee } from "@/actions/employee/actions";
import Loading from "@/app/loading";
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
import useAbilities from "@/hooks/useAbilities";
import { useEmployee } from "@/hooks/useEmployee";
import { useManagers } from "@/hooks/useManagers";
import { useRoles } from "@/hooks/useRoles";
import { employeeFormSchema, EmployeeFormValues } from "@/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import Spinner from "@/components/general/Spinner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
interface EmployeeFormProps {
  employeeId?: number;
  disabled?: boolean;
}

function EmployeeForm({ employeeId, disabled = false }: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    disabled,
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      id: null,
      name: "",
      email: "",
      phone: "",
      roleId: "",
      userName: "",
      password: "",
      managerId: null,
      suspended: false,
      abilityIds: [],
      hasViewCashBoxAbility: false,
    },
  });

  const {
    employee,
    isLoading: isLoadingEmployee,
    error: employeeError,
  } = useEmployee(employeeId!);
  const { data: managers, isLoading: isLoadingManagers } = useManagers();
  const { roles, isLoading: isLoadingRoles, error: rolesError } = useRoles();

  const currentRole = form.watch("roleId");
  const role = roles?.find((r) => r.id.toString() === currentRole);
  const { abilities, isLoading: isLoadingAbilities } = useAbilities(role!);
  useEffect(() => {
    if (employee?.id && managers) {
      form.reset({
        ...employee,
        abilityIds: employee.abilityDTOs.map((ability) => ability.id),
      });
    }
    return () => {
      form.reset();
    };
  }, [employee, form, managers, role]);

  const handleSubmit = useCallback(
    (data: EmployeeFormValues) => {
      if (disabled) return;
      const id = toast.loading("جاري الحفظ...");
      if (employee?.id) {
        updateEmployee(data)
          .then((res) => {
            if (res.success) toast.success("تم تحديث الموظف بنجاح", { id });
            else toast.error(res.message, { id });
          })
          .catch(() => {
            toast.error("حدث خطأ أثناء تحديث الموظف", { id });
          });
      } else {
        createEmployee(data).then((res) => {
          if (res.success) {
            toast.success("تم إضافة الموظف بنجاح", { id });
          } else {
            toast.error(res.message, { id });
          }
        });
      }
    },
    [disabled, employee],
  );

  const handleAbilityChange = useCallback(
    (
      abilityId: number,
      checked: boolean,
      field: ControllerRenderProps<EmployeeFormValues, "abilityIds">,
    ) => {
      const currentAbilities = form.getValues("abilityIds") || [];
      if (checked) {
        const abilityToAdd = abilities?.find((a) => a.id === abilityId);
        if (abilityToAdd) {
          field.onChange([...currentAbilities, abilityToAdd.id]);
        }
      } else {
        field.onChange(currentAbilities.filter((a) => a !== abilityId));
      }
    },
    [abilities, form],
  );
  const onSelectRole = useCallback(
    function (value: string) {
      form.setValue("roleId", value);
      form.setValue("abilityIds", []);
      form.setValue("managerId", null);
    },
    [form],
  );

  if (isLoadingEmployee || isLoadingRoles) {
    return <Loading />;
  }
  if (employeeError || rolesError) {
    throw new Error(employeeError?.message || rolesError?.message);
  }
  const isLoading =
    form.formState.isLoading ||
    form.formState.isSubmitting ||
    isLoadingAbilities;

  const submitButtonText = employee?.id ? "تحديث الموظف" : "إضافة موظف";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Personal Information Grid */}
          <div className="max-h-[50vh] space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل الاسم الكامل"
                        {...field}
                        value={field.value ?? ""}
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
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوظيفة</FormLabel>
                    <Select
                      {...field}
                      disabled={isLoadingRoles || field.disabled}
                      onValueChange={onSelectRole}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"اختار الوظيفه"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir="rtl">
                        {roles?.map((role) => (
                          <SelectItem value={role.id?.toString()} key={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="managerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدير المباشر</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isLoadingManagers || field.disabled}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={
                          field.value != null ? field.value.toString() : ""
                        }
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
                      <Input
                        placeholder="أدخل اسم المستخدم"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل كلمة المرور"
                        type="password"
                        {...field}
                        value={field.value ?? ""}
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>حالة الموظف</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      {field.value ? "معطل" : "مفعل"}
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      className="flex-row-reverse"
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                      disabled={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hasViewCashBoxAbility"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>عرض صندوق النقد</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      {field.value ? "مفعل" : "معطل"}
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      className="flex-row-reverse"
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                      disabled={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Permissions Section */}
            <FormField
              control={form.control}
              name="abilityIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الصلاحيات</FormLabel>
                  <div className="flex flex-wrap gap-6">
                    {abilities.length > 0 &&
                      abilities.map((permission) => {
                        return (
                          <div
                            key={permission.id}
                            className="flex flex-wrap items-center"
                          >
                            <Checkbox
                              checked={Boolean(
                                field.value?.some(
                                  (ability: number) =>
                                    ability === permission.id,
                                ),
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
                      })}
                    {!role && (
                      <p className="text-sm text-gray-500">
                        يرجى اختيار الوظيفه لعرض الصلاحيات المتاحة.
                      </p>
                    )}
                    {abilities.length == 0 && role && !isLoadingAbilities && (
                      <p className="text-sm text-gray-500">
                        لا توجد صلاحيات متاحة لهذه الوظيفه.
                      </p>
                    )}
                    {isLoadingAbilities && (
                      <div className="flex w-full items-center justify-center p-2">
                        <Spinner />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
    </>
  );
}

export default EmployeeForm;
