import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";

function ReportsButton() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>تقرير الطلبات الداخليه</Button>
      </Dialog.Trigger>
      <Dialog.Content title="تقرير الطلبات الداخليه">
        <p>محتوى التقرير هنا</p>
      </Dialog.Content>
    </Dialog>
  );
}
export default ReportsButton;
