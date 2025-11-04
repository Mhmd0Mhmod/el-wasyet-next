import z from "zod";

export const refundOrderSchema = z.object({
  orderId: z.number().int().positive(),
  action: z.string(),
  notes: z.string().optional(),
  amount: z.number().optional(),
  cashAmount: z.number().optional(),
  creditAmount: z.number().optional(),
  reason: z.string().nullable().optional(),
  isFormPaidInCash: z.boolean().nullable().optional(),
  isFormPaidByCredit: z.boolean().nullable().optional(),
});

export type RefundOrderInput = z.infer<typeof refundOrderSchema>;
