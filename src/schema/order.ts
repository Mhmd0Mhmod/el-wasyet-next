import { OrderDetails } from "@/types/order";
import { z } from "zod";
import { overheadSchema } from "./service";

// Custom document schema to match CreateCustomDocumentDTO
const customDocumentSchema = z.object({
  Description: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 100, {
      message: "يجب ان لا يزيد اسم المستند عن 100 حرف",
    }),
});

// Create file schema to match CreateFile DTO
const createFileSchema = z.object({
  OrderId: z.number().min(1, { message: "يجب اختيار طلب" }).optional(),
  FileTypeId: z.number().min(1, { message: "يجب اختيار نوع الملف" }),
  File: z.instanceof(File, { message: "يجب اختيار ملف" }),
});

export const orderFormSchema = z.object({
  ClientId: z.number().min(1, { message: "يجب اختيار عميل" }),
  RequiredChange: z
    .string()
    .max(255, { message: "يجب ان لا يزيد التغيير المطلوب عن 255 حرف" }),
  Notes: z
    .string()
    .max(1000, { message: "يجب ان لا يزيد الملاحظات عن 1000 حرف" })
    .optional(),
  DeliveryAddress: z
    .string()
    .max(255, { message: "يجب ان لا يزيد عنوان التسليم عن 255 حرف" })
    .optional(),
  BirthDate: z.string().nullable().optional(),
  Quantity: z
    .number()
    .min(1, { message: "يجب ان تكون الكمية على الاقل 1" })
    .optional(),
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
  Documents: z.array(z.number().min(1, { message: "يجب اختيار مستند" })),
  CustomDocuments: z.array(customDocumentSchema).optional(),
  OverheadIds: z.array(z.number().min(1, { message: "يجب اختيار مصاريف" })),
  CustomOverheads: z.array(overheadSchema).optional(),
  CreateFiles: z.array(createFileSchema).optional(),
  IsPending: z.boolean(),
  OfferId: z.number().min(1, { message: "يجب اختيار عرض سعر" }).optional(),
  AgentId: z.number().min(1, { message: "يجب اختيار وكيل" }).optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export function generateOrderDefaultValues(
  order?: Partial<OrderDetails>,
): Partial<OrderFormValues> {
  return {
    ClientId: 0,
    RequiredChange: order?.requiredChange || "",
    Notes: order?.notes || "",
    DeliveryAddress: order?.deliveryAddress || "",
    BirthDate: null,
    Quantity: undefined,
    Cash: order?.cash || 0,
    Credit: order?.credit || 0,
    Amount: order?.amount || 0,
    ServiceFees: 0,
    Documents: order?.documents?.map((doc) => doc.id) || [],
    CustomDocuments: [],
    OverheadIds: order?.overheads?.map((overhead) => overhead.overheadID) || [],
    CustomOverheads: [],
    CreateFiles: [],
    IsPending: false,
    OfferId: undefined,
    AgentId: order?.agentId ? Number(order.agentId) : undefined,
  };
}
