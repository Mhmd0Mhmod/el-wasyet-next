import z from "zod";

// Validation Schema
const customerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "الاسم الكامل يجب أن يحتوي على حرفين على الأقل" })
    .max(100, { message: "الاسم الكامل يجب ألا يزيد عن 100 حرف" }),
  email: z
    .string()
    .email({ message: "البريد الإلكتروني غير صحيح" })
    .min(1, { message: "البريد الإلكتروني مطلوب" }),
  phone1: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف يجب ألا يزيد عن 15 رقم" }),
  phone2: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف يجب ألا يزيد عن 15 رقم" })
    .optional(),
  address: z
    .string()
    .min(5, { message: "العنوان يجب أن يحتوي على 5 أحرف على الأقل" })
    .max(200, { message: "العنوان يجب ألا يزيد عن 200 حرف" }),
  type: z.enum(["main", "branch"], {
    message: "يجب اختيار النوع",
  }),
  // Additional customer fields
  additionalCustomer: z
    .object({
      fullName: z.string().optional(),
      email: z
        .string()
        .email({ message: "البريد الإلكتروني غير صحيح" })
        .optional()
        .or(z.literal("")),
      phone1: z.string().optional(),
      phone2: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

export { customerFormSchema };
export type { CustomerFormValues };
