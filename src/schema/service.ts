import { ShortWorkFlow } from "@/types/service";
import z from "zod";

export const generateServieSchema = (workFlows: ShortWorkFlow[]) =>
  z.object({
    name: z.string().min(1, "الاسم مطلوب"),
    defaultFees: z.number().min(0, "الرسوم الافتراضية يجب أن تكون غير سالبة"),
    validityPeriodDays: z.number().min(0, "فترة الصلاحية يجب أن تكون موجبة"),
    expiryPeriodYears: z.number().min(0, "فترة الانتهاء يجب أن تكون موجبة"),
    isCertificate: z.boolean(),
    documents: z.array(
      z.object({
        description: z.string().min(1, "وصف الوثيقة مطلوب"),
      }),
    ),
    workflows: z.array(
      z.object({
        orderStatusId: z
          .number()
          .min(1, "حالة سير العمل مطلوبة")
          .refine(
            (val) => workFlows.some((workflow) => workflow.id === Number(val)),
            {
              message: "حالة سير العمل غير صالحة",
            },
          ),
        sequence: z.number().min(1, "وصف سير العمل مطلوب"),
      }),
    ),
    overheads: z.array(
      z
        .object({
          value: z.number().min(0, "القيمة يجب أن تكون غير سالبة"),
          description: z.string().min(1, "الوصف مطلوب"),
          penalty: z.boolean().optional(),
          forms: z.boolean().optional(),
          adminFees: z.boolean().optional(),
          formTypeID: z.number().nullable().optional(),
        })
        .superRefine((data, ctx) => {
          if (
            data.forms === true &&
            (data.formTypeID === null || data.formTypeID === undefined)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "نوع النموذج مطلوب عند تفعيل النماذج",
              path: ["formTypeID"],
            });
          }
          const activeFields = [
            data.penalty === true,
            data.forms === true,
            data.adminFees === true,
          ].filter(Boolean).length;

          if (activeFields > 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "يمكن تفعيل خيار واحد فقط من: الغرامة، النماذج، أو الرسوم الإدارية",
              path: ["penalty"],
            });
          }
        }),
    ),
  });
export type ServiceValues = z.infer<ReturnType<typeof generateServieSchema>>;
