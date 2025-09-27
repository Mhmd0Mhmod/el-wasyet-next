"use client";
import { Login } from "@/actions/auth/actions";
import { LoginFormValues } from "@/schema/login";
import { ShortBranch } from "@/types/branch";
import { EyeClosed, User } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function LoginForm({ branches }: { branches?: ShortBranch[] | null }) {
  const form = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  function onSubmit(data: LoginFormValues) {
    const branchId = data.branchId;
    if (!branchId) {
      form.setError("branchId", { message: "يجب اختيار فرع" });
      return;
    }
    setIsLoading(true);
    Login(data)
      .then((res) => {
        if (!res.success) {
          form.setError("root", { message: res.message });
        } else {
          toast.success("تم تسجيل الدخول بنجاح");
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="usernameOrEmail"
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
          name="branchId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                  value={field.value?.toString()}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
        {form.formState.errors.root && (
          <p className="text-sm text-red-600">
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
}

export default LoginForm;
