import z from "zod";

const branchClientSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  email: z
    .string()
    .email({ message: "البريد الإلكتروني غير صحيح" })
    .optional()
    .or(z.literal("")),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  address: z.string().optional(),
});
const clientFormSchema = z.object({
  id: z.number().nullable().optional(),
  name: z
    .string()
    .min(2, { message: "الاسم الكامل يجب أن يحتوي على حرفين على الأقل" })
    .max(100, { message: "الاسم الكامل يجب ألا يزيد عن 100 حرف" }),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "البريد الإلكتروني غير صحيح",
    })
    .optional()
    .or(z.literal("")),
  phone1: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف يجب ألا يزيد عن 15 رقم" }),
  phone2: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف يجب ألا يزيد عن 15 رقم" })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "العنوان يجب أن يحتوي على 5 أحرف على الأقل" })
    .max(200, { message: "العنوان يجب ألا يزيد عن 200 حرف" })
    .optional()
    .or(z.literal("")),
  childClients: z.array(branchClientSchema).optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;
type BranchClientValues = z.infer<typeof branchClientSchema>;
export { clientFormSchema, branchClientSchema };
export type { ClientFormValues, BranchClientValues };
