import z from "zod";

const StockItemSchema = z.object({
  formTypeId: z.number(),
  quantity: z.number(),
  minimumThreshold: z.number(),
});
const StockSchema = z.object({
  branchId: z.number(),
  forms: z.array(StockItemSchema),
});
export type Stock = z.infer<typeof StockSchema>;
export type StockItem = z.infer<typeof StockItemSchema>;
