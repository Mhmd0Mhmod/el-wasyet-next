"use client";
import NewForm from "@/components/(dashboard)/stock/new-form";
import Dialog from "@/components/shared/Dialog";
import { Button } from "@/components/ui/button";
import { StockFormItem } from "@/types/stock-item";
import { Edit3 } from "lucide-react";
function DialogNewFormWrapper({
  form,
  branchId,
}: {
  form: StockFormItem;
  branchId: number;
}) {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="ghost" size="icon">
          <Edit3 size={16} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="تعديل بيانات الاستماره">
        <NewForm
          form={{
            formTypeId: form.formId,
            branchId: branchId,
            stockId: form.stockId,
            threshold: form.minimumThreshold,
            quantity: form.quantity,
            price: form.price,
            minimumThreshold: form.minimumThreshold,
          }}
        />
      </Dialog.Content>
    </Dialog>
  );
}
export default DialogNewFormWrapper;
