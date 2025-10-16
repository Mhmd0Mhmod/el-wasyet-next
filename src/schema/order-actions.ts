import z from "zod";

export const OrderActionSchema = z
  .object({
    amount: z.number().optional(),
    cashAmount: z.number(),
    creditAmount: z.number(),
  })
  .refine(
    (data) => {
      if (data.amount !== undefined) {
        const cash = data.cashAmount || 0;
        const credit = data.creditAmount || 0;
        return cash + credit === data.amount;
      }
      return true;
    },
    {
      message: "مجموع المبلغ النقدي والائتماني يجب أن يساوي المبلغ الإجمالي",
      path: ["amount"],
    },
  );

export type OrderActionType = z.infer<typeof OrderActionSchema>;
