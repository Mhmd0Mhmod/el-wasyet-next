import z from "zod";

export const expenseSchema = z.object({
  entryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z.string().max(255).optional(),
  amount: z.number().positive(),
  comments: z.string().max(255).optional(),
  branchId: z.number().min(1),
  employeeId: z.number().min(1).optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
