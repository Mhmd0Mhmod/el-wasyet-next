import { z } from "zod";
import { overheadSchema } from "./service";

// Custom document schema to match CreateCustomDocumentDTO
const customDocumentSchema = z.object({
  id: z.number().optional(),
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
  File: z.instanceof(File, { message: "يجب اختيار ملف" }).optional(),
  fileUrl: z.string().optional(),
  fileExtension: z.string().optional(),
  fileTypeName: z.string().nullable().optional(),
  id: z.number().optional(),
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
    .nullable()
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
  Documents: z.array(z.number()),
  CustomDocuments: z.array(customDocumentSchema).optional(),
  OverheadIds: z.array(z.number()).optional(),
  CustomOverheads: z.array(overheadSchema).optional(),
  CreateFiles: z.array(createFileSchema).optional(),
  IsPending: z.boolean(),
  OfferId: z.number().min(1, { message: "يجب اختيار عرض سعر" }).optional(),
  ImageUrlForOffer: z.file().optional(),
  imageurlStringForOffer: z.string().nullable().optional(),
  AgentId: z.number().min(1, { message: "يجب اختيار وكيل" }).optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
