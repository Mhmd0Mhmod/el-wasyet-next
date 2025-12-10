import z from "zod";

const branchClientSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string()
    .min(2, { message: "الاسم الكامل يجب أن يحتوي على حرفين على الأقل" })
    .max(100, { message: "الاسم الكامل يجب ألا يزيد عن 100 حرف" }),
  email: z.string().nullable().optional().or(z.literal("")).nullable(),
  phone1: z.string().nullable().optional().nullable(),
  phone2: z.string().nullable().optional().nullable(),
  address: z.string().nullable().optional().nullable(),
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
    .nullable()
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
  updateClientChildDTOs: z.array(branchClientSchema).optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;
type BranchClientValues = z.infer<typeof branchClientSchema>;
export { clientFormSchema, branchClientSchema };
export type { ClientFormValues, BranchClientValues };
