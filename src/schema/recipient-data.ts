import z from "zod";

const AddReccipientForm = z.object({
  orderId: z.string(),
  receiverName: z.string().min(1, "اسم المستلم مطلوب"),
  reciverImage: z.instanceof(File, { message: "صورة بطاقه المستلم مطلوبة" }),
});
export type AddRecipientFormType = z.infer<typeof AddReccipientForm>;
export { AddReccipientForm };
