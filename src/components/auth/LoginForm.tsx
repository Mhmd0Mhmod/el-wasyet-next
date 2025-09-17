"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import Input from "../general/Input";
import { EyeClosed, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LoginFormValues } from "@/schema/login";
function LoginForm() {
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
                    <SelectItem value="cairo">القاهرة</SelectItem>
                    <SelectItem value="giza">الجيزة</SelectItem>
                    <SelectItem value="alex">الإسكندرية</SelectItem>
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
