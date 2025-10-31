import * as z from "zod";
const StockItemFormSchema = z.object({
  formTypeId: z.number(),
  quantity: z.number(),
  branchId: z.number(),
  threshold: z.number(),
  stockId: z.number().optional(),
  price: z.number().optional(),
  minimumThreshold: z.number().optional(),
});

type StockItemForm = z.infer<typeof StockItemFormSchema>;

export type { StockItemForm };
export { StockItemFormSchema };
