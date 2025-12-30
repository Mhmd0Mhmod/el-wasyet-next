"use client";

import { createEmployee, updateEmployee } from "@/actions/employee/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import useAbilities from "@/hooks/useAbilities";
import { useEmployee } from "@/hooks/useEmployee";
import { EmployeeFormValues, employeeFormSchema } from "@/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EmployeFormProps = {
  employeeId?: number;
  disabled?: boolean;
  managers: ShortManager[];
  roles: Role[];
};

function EmployeeForm({
  employeeId,
  disabled = false,
  managers,
  roles,
}: EmployeFormProps) {
  const { employee, isLoading, isFetching } = useEmployee(employeeId!);
  const isEditMode = !!employeeId;

  if (isLoading || isFetching) {
    return <EmployeeFormSkeleton />;
  }
  return (
    <EmployeeFormContent
      employee={employee}
      isEditMode={isEditMode}
      disabled={disabled}
      managers={managers}
      roles={roles}
    />
  );
}
function EmployeeFormContent({
  employee,
  disabled = false,
  managers,
  roles,
  isEditMode = !!employee?.id,
}: EmployeFormProps & { isEditMode?: boolean; employee?: Employee }) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    disabled,
    defaultValues: isEditMode
      ? {
          ...employee,
          abilityIds: employee?.abilityDTOs.map((ability) => ability.id) || [],
          password: "",
          managerId: employee?.managerId,
        }
      : {
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
        },
  });

  const selectedRoleId = form.watch("roleId");
  const selectedRole = roles.find(
    (role) => role.id.toString() === selectedRoleId,
  );
  const { data: abilities, isLoading: isAbilitiesLoading } =
    useAbilities(selectedRole);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (abilities && !isAbilitiesLoading) {
      if (employee && selectedRole?.id.toString() === employee.roleId) {
        form.setValue(
          "abilityIds",
          employee.abilityDTOs.map((ability) => ability.id),
        );
      } else {
        form.setValue(
          "abilityIds",
          abilities
            .filter((ability) => ability.isRelated)
            .map((ability) => ability.id),
        );
      }
    }
  }, [selectedRole, form, abilities, isAbilitiesLoading, employee]);

  const onSubmit = useCallback(
    async (data: EmployeeFormValues) => {
      const id = toast.loading("جاري الحفظ...");
      try {
        if (isEditMode) {
          const res = await updateEmployee(data);
          if (res.success) {
            toast.success("تم تعديل الموظف بنجاح", { id });
            queryClient.invalidateQueries({
              queryKey: ["employee", data.id],
            });
          } else {
            toast.error(res.message || "حدث خطأ أثناء تعديل الموظف", { id });
          }
        } else {
          const res = await createEmployee(data);
          if (res.success) {
            toast.success("تم إضافة الموظف بنجاح", { id });
            form.reset();
          } else {
            toast.error(res.message || "حدث خطأ أثناء إضافة الموظف", { id });
          }
        }
      } catch {
        toast.error("حدث خطأ غير متوقع", { id });
      }
    },
    [isEditMode, form, queryClient],
  );
  return (
    <div dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* الاسم الكامل */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input placeholder="الاسم الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* البريد الإلكتروني */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* رقم الهاتف */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input placeholder="رقم الهاتف" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الوظيفة */}
            <FormField
              name="roleId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوظيفة</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full" dir="rtl">
                        <SelectValue placeholder="اختر الوظيفة" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* اسم المستخدم */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المستخدم</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المستخدم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* كلمة المرور */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"كلمة المرور"}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* المدير المباشر */}
            <FormField
              control={form.control}
              name="managerId"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>المدير المباشر</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full" dir="rtl">
                        <SelectValue placeholder="اختر المدير المباشر" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        {managers?.map((manager) => (
                          <SelectItem
                            key={manager.id}
                            value={manager.id.toString()}
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

            {/* حالة الموظف */}
            <FormField
              control={form.control}
              name="suspended"
              render={({ field }) => (
                <FormItem className="col-span-2 flex items-center justify-between rounded-lg border p-3">
                  <FormLabel className="cursor-pointer">موقوف</FormLabel>
                  <FormControl>
                    <Switch
                      disabled={field.disabled}
                      className="flex-row-reverse"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* الصلاحيات */}
          <FormField
            control={form.control}
            name="abilityIds"
            render={() => (
              <FormItem>
                <FormLabel>الصلاحيات</FormLabel>
                <div className="grid grid-cols-2 gap-3 rounded-lg border p-4 md:grid-cols-3 lg:grid-cols-4">
                  {isAbilitiesLoading ? (
                    <p className="text-muted-foreground col-span-full text-sm">
                      جاري تحميل الصلاحيات...
                    </p>
                  ) : !selectedRole?.id ? (
                    <p className="text-muted-foreground col-span-full text-sm">
                      اختر الوظيفة أولاً لعرض الصلاحيات
                    </p>
                  ) : abilities?.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-sm">
                      لا توجد صلاحيات لهذه الوظيفة
                    </p>
                  ) : (
                    abilities?.map((ability) => (
                      <FormField
                        key={ability.id}
                        control={form.control}
                        name="abilityIds"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                disabled={field.disabled}
                                checked={field.value?.includes(ability.id)}
                                onCheckedChange={(checked: boolean) => {
                                  const newValue = checked
                                    ? [...(field.value || []), ability.id]
                                    : field.value?.filter(
                                        (id) => id !== ability.id,
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="mt-0! cursor-pointer text-sm font-normal">
                              {ability.label || ability.abilityName}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {!disabled && (
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "جاري الحفظ..."
                  : isEditMode
                    ? "تعديل"
                    : "إضافة"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;

export function EmployeeFormSkeleton() {
  return (
    <div dir="rtl" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Field skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
      {/* Abilities skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="grid grid-cols-2 gap-3 rounded-lg border p-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
      {/* Buttons skeleton */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
}
