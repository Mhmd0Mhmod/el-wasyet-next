import { OrderDetails } from "@/types/order";
import { z } from "zod";

export const orderFormSchema = z.object({
  ClientId: z.number().min(1, { message: "يجب اختيار عميل" }),
  RequiredChange: z
    .string()
    .max(255, { message: "يجب ان لا يزيد التغيير المطلوب عن 255 حرف" })
    .optional(),
  Notes: z
    .string()
    .max(1000, { message: "يجب ان لا يزيد الملاحظات عن 1000 حرف" })
    .optional(),
  DeliveryAddress: z
    .string()
    .max(255, { message: "يجب ان لا يزيد عنوان التسليم عن 255 حرف" })
    .optional(),
  BirthDate: z.string().optional(),
  Quantity: z.number().min(1, { message: "يجب ان تكون الكمية على الاقل 1" }),
  ServiceId: z.number().min(1, { message: "يجب اختيار نوع الخدمة" }),
  Cash: z.number().min(0, { message: "يجب ان يكون المبلغ النقدي على الاقل 0" }),
  Credit: z
    .number()
    .min(0, { message: "يجب ان يكون المبلغ الآجل على الاقل 0" }),
  Amount: z
    .number()
    .min(0, { message: "يجب ان يكون المبلغ الكلي على الاقل 0" }),
  ServiceFees: z
    .number()
    .min(0, { message: "يجب ان تكون مصاريف الخدمة على الاقل 0" }),
  Documents: z
    .array(
      z.object({
        DocumentId: z.number().min(1, { message: "يجب اختيار مستند" }),
        Quantity: z
          .number()
          .min(1, { message: "يجب ان تكون الكمية على الاقل 1" }),
      }),
    )
    .optional(),
  CustomDocuments: z
    .array(
      z.object({
        Name: z
          .string()
          .max(100, { message: "يجب ان لا يزيد اسم المستند عن 100 حرف" }),
        Description: z.string().optional(),
        Quantity: z
          .number()
          .min(1, { message: "يجب ان تكون الكمية على الاقل 1" }),
      }),
    )
    .optional(),
  OverheadIds: z
    .array(z.number().min(1, { message: "يجب اختيار مصاريف" }))
    .optional(),
  CustomOverheads: z
    .array(
      z.object({
        Name: z
          .string()
          .max(100, { message: "يجب ان لا يزيد اسم المصاريف عن 100 حرف" }),
        Amount: z
          .number()
          .min(0, { message: "يجب ان تكون المصاريف على الاقل 0" }),
      }),
    )
    .optional(),
  CreateFiles: z
    .array(
      z.object({
        FileId: z.number().min(1, { message: "يجب اختيار ملف" }),
        Quantity: z
          .number()
          .min(1, { message: "يجب ان تكون الكمية على الاقل 1" }),
      }),
    )
    .optional(),
  IsPending: z.boolean().optional(),
  OfferId: z.number().min(1, { message: "يجب اختيار عرض سعر" }).optional(),
  AgentId: z.number().min(1, { message: "يجب اختيار وكيل" }).optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export function generateOrderDefaultValues(
  order?: Partial<OrderDetails>,
): OrderFormValues {
  return {
    ClientId: order?.clientId || 0,
    RequiredChange: order?.requiredChange || "",
    Notes: order?.notes || "",
    DeliveryAddress: order?.deliveryAddress || "",
    BirthDate: order?.birthDate || "",
    Quantity: order?.quantity || 0,
    ServiceId: order?.serviceId || 0,
    Cash: order?.cash || 0,
    Credit: order?.credit || 0,
    Amount: order?.amount || 0,
    ServiceFees: order?.serviceFees || 0,
    Documents: order?.documents || [],
    CustomDocuments: order?.customDocuments || [],
    OverheadIds: order?.overheads || [],
    CustomOverheads: order?.customOverheads || [],
    CreateFiles: order?.createdFiles || [],
    IsPending: order?.isPending ?? true,
    OfferId: order?.offerId || undefined,
    AgentId: order?.agentId || undefined,
  };
}
