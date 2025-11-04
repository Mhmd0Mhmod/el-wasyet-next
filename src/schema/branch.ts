import { z } from "zod";
export const branchSchema = z.object({
  name: z.string().min(1, "اسم الفرع مطلوب"),
  managerId: z.number().min(1, "مدير الفرع مطلوب").nullable(),
  telephone: z.string().min(1, "رقم الهاتف مطلوب"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
});

export type BranchFormData = z.infer<typeof branchSchema>;
