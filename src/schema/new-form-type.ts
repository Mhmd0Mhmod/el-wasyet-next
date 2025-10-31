import z from "zod";

const NewFormTypeSchema = z.object({
  formName: z
    .string()
    .min(2, "اسم الاستمارة يجب أن يحتوي على حرفين على الأقل")
    .max(100, "اسم الاستمارة يجب ألا يزيد عن 100 حرف"),
  price: z.number().min(0, "يجب أن يكون السعر أكبر من 0"),
});

export type NewFormTypeForm = z.infer<typeof NewFormTypeSchema>;

export { NewFormTypeSchema };
