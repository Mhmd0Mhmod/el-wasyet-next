"use client";
import Dialog from "../general/Dialog";
import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";

function UploadDocumentButton() {
  const form = useOrderForm();
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button type="button" variant="outline">
          رفع المستندات
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="رفع المستندات">
        <div></div>
      </Dialog.Content>
    </Dialog>
  );
}
export default UploadDocumentButton;
