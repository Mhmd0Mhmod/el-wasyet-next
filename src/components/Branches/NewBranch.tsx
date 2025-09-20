import Dialog from "../general/Dialog";
import NewBranchFrom from "./NewBranchFrom";
import { Branch } from "@/types/branch";

function NewBranch({
  branch,
  Trigger,
}: {
  branch?: Branch;
  Trigger: () => React.ReactNode | React.ReactNode;
}) {
  return (
    <Dialog>
      <Dialog.Trigger>{Trigger()}</Dialog.Trigger>
      <Dialog.Content title={branch ? "تعديل الفرع" : "إضافة فرع جديد"}>
        <NewBranchFrom branch={branch} />
      </Dialog.Content>
    </Dialog>
  );
}
function Trigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
}
NewBranch.Trigger = Trigger;
export default NewBranch;
