import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";
import ReportsForm from "@/components/(dashboard)/dashboard/reports-form";

function ReportsButton() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>تقرير الطلبات الداخليه</Button>
      </Dialog.Trigger>
      <Dialog.Content title="تقرير الطلبات الداخليه">
        <ReportsForm />
      </Dialog.Content>
    </Dialog>
  );
}
export default ReportsButton;
