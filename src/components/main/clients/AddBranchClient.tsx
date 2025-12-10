import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BranchClientValues, branchClientSchema } from "@/schema/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function AddBranchClient({
  onSubmit,
}: {
  onSubmit: (formData: BranchClientValues) => void;
}) {
  const form = useForm<BranchClientValues>({
    resolver: zodResolver(branchClientSchema),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="bg-white p-6" dir="rtl">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">الاسم الداخلي</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="text-right"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">
                    البريد الالكتروني
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="text-right"
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">رقم الهاتف 1</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="text-right"
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">رقم الهاتف 2</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="text-right"
                      value={field.value || ""}
                    />
                  </FormControl>
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
                    {...field}
                    className="text-right"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            حفظ
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddBranchClient;
