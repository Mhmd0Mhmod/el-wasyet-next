"use client";

import { createBranch, updateBranch } from "@/actions/branches/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManagers } from "@/hooks/useManagers";
import { BranchFormData, branchSchema } from "@/schema/branch";
import { Branch } from "@/types/branch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DialogClose } from "../ui/dialog";

function NewBranchFrom({ branch }: { branch?: Branch }) {
  const { data: managers } = useManagers();
  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: branch ? branch.name : "",
      managerId: branch ? branch.managerId?.toString() : null,
      telephone: branch ? branch.telephone || "" : "",
      email: branch ? branch.email : "",
      address: branch ? branch.address : "",
    },
  });
  const onSubmit = (data: BranchFormData) => {
    if (branch) {
      updateBranch(branch.id, data).then((res) => {
        if (res.success) {
          toast.success("تم تعديل الفرع بنجاح");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      createBranch(data).then((res) => {
        if (res.success) {
          form.reset();
          toast.success("تم إضافة الفرع بنجاح");
        } else {
          toast.error(res.message);
        }
      });
    }
  };

  return (
    <div dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">اسم الفرع</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="اسم الفرع"
                      {...field}
                      className="text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">مدير الفرع</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="اختر مدير الفرع" />
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

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="رقم الهاتف"
                      {...field}
                      className="text-right"
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
                      placeholder="البريد الإلكتروني"
                      {...field}
                      className="text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">العنوان</FormLabel>
                <FormControl>
                  <Input
                    placeholder="العنوان"
                    {...field}
                    className="text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="px-8">
                الغاء
              </Button>
            </DialogClose>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NewBranchFrom;
