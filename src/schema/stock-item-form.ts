import * as z from "zod";
const StockItemFormSchema = z.object({
  formTypeId: z.number(),
  quantity: z.number(),
  branchId: z.number(),
  stockId: z.number().optional(),
  price: z.float32().optional(),
  minimumThreshold: z.float32().optional(),
});

type StockItemForm = z.infer<typeof StockItemFormSchema>;

export type { StockItemForm };
export { StockItemFormSchema };
