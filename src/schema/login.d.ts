import z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("ادخل بريد إلكتروني صالح"),
  branch: z.string().min(1, "اختر فرعًا"),
  password: z.string().min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export { loginFormSchema };
