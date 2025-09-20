"use client";
import { LoginFormValues } from "@/schema/login";
import { Branch, ShortBranch } from "@/types/branch";
import { EyeClosed, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../general/Input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
function LoginForm({ branches }: { branches?: ShortBranch[] | null }) {
  const router = useRouter();
  const form = useForm<LoginFormValues>();
  const handleSubmit = (data: LoginFormValues) => {
    router.push("/branches");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  props={{
                    placeholder: "اسم المستخدم",
                    ...field,
                  }}
                  Icon={User}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger dir="rtl" className="w-full">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {branches?.map((branch) => (
                      <SelectItem
                        key={branch.branchId}
                        value={String(branch.branchId)}
                      >
                        {branch.branchName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  props={{
                    placeholder: "كلمة المرور",
                    type: "password",
                    ...field,
                  }}
                  Icon={EyeClosed}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          تسجيل الدخول
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
