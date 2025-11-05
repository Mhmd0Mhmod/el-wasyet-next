import z from "zod";

const loginFormSchema = z.object({
  usernameOrEmail: z.string(),
  branchId: z.string().min(1, "اختر فرعًا"),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export { loginFormSchema };
