"use client";

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
import { Branch } from "@/lib/types/branch";
import { BranchFormData, branchSchema } from "@/schema/branch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogClose } from "../ui/dialog";

function NewBranchFrom({ branch }: { branch?: Branch }) {
  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branchName: branch ? branch.name : "",
      managerName: branch ? branch.managerName : "",
      telephone: branch ? branch.telephone || "" : "",
      email: branch ? branch.email : "",
      address: branch ? branch.address : "",
    },
  });

  const onSubmit = (data: BranchFormData) => {
    console.log(data);
  };

  return (
    <div dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="branchName"
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
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">مدير الفرع</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="اختر مدير الفرع" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="manager1">مدير 1</SelectItem>
                        <SelectItem value="manager2">مدير 2</SelectItem>
                        <SelectItem value="manager3">مدير 3</SelectItem>
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
