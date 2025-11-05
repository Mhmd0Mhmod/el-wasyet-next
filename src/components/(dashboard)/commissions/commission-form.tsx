"use client";

import {
  createCommission as createCommissionAction,
  updateCommission as updateCommissionAction,
} from "@/actions/commissions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoles } from "@/hooks/useRoles";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
function CommissionForm({ commission }: { commission?: Commission }) {
  const form = useForm<Partial<Commission>>({
    defaultValues: commission || {
      roleId: "",
      commissionPercentage: 0,
    },
  });
  const { roles, isLoading: isRolesLoading } = useRoles();
  const updateCommission = useCallback(async (data: Partial<Commission>) => {
    const id = toast.loading("جاري تحديث العموله...");
    try {
      const response = await updateCommissionAction(data);
      if (response.success) {
        toast.success("تم تحديث العموله بنجاح", { id });
      } else {
        toast.error(response.message || "حدث خطأ أثناء تحديث العموله", {
          id,
        });
      }
    } catch {
      toast.error("حدث خطأ أثناء تحديث العموله", { id });
    }
  }, []);
  const createCommission = useCallback(async (data: Partial<Commission>) => {
    const id = toast.loading("جاري إنشاء العموله...");
    try {
      const response = await createCommissionAction(data);
      if (response.success) {
        toast.success("تم إنشاء العموله بنجاح", { id });
      } else {
        toast.error(response.message || "حدث خطأ أثناء إنشاء العموله", {
          id,
        });
      }
    } catch {
      toast.error("حدث خطأ أثناء إنشاء العموله", { id });
    }
  }, []);
  const onSubmit = useCallback(
    (data: Partial<Commission>) => {
      if (commission) {
        updateCommission(data);
      } else {
        createCommission(data);
      }
    },
    [commission, createCommission, updateCommission],
  );
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="space-y-2">
          <Label>المسمي الوظيفي</Label>
          <Controller
            name="roleId"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className="w-full disabled:bg-gray-400"
                  dir="rtl"
                  disabled={isRolesLoading}
                >
                  <SelectValue placeholder="اختر المسمي الوظيفي" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label>نسبه العموله %</Label>
          <Input
            type="text"
            {...form.register("commissionPercentage", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="mt-4 flex justify-end sm:col-span-2">
          <Button type="submit">حفظ</Button>
        </div>
      </form>
    </div>
  );
}
export default CommissionForm;
