import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function AccountTransactionActions() {
  return (
    <>
      <AlertDialogAction asChild>
        <Button>تأكيد</Button>
      </AlertDialogAction>
      <AlertDialogCancel asChild>
        <Button variant="outline">إلغاء</Button>
      </AlertDialogCancel>
    </>
  );
}
export default AccountTransactionActions;
