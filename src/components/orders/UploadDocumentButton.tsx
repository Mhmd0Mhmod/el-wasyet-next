"use client";
import Dialog from "../general/Dialog";
import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";

function UploadDocumentButton() {
  const form = useOrderForm();
  const [Documents, CustomDocuments] = form.watch([
    "Documents",
    "CustomDocuments",
  ]);

  if (!Documents && CustomDocuments?.length === 0) {
    return null;
  }
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button type="button" variant="outline">
          رفع المستندات (
          {(Documents?.length || 0) + (CustomDocuments?.length || 0)})
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="رفع المستندات">
        <div></div>
      </Dialog.Content>
    </Dialog>
  );
}
export default UploadDocumentButton;
