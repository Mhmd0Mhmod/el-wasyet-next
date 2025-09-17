import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewBranchFrom from "./NewBranchFrom";
import { Branch } from "@/lib/types/branch";

function NewBranchButton({
  branch,
  children,
}: {
  branch?: Branch;
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" className="w-full">
            <Plus className="ml-2" />{" "}
            {branch ? "تعديل الفرع" : "إضافة فرع جديد"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex justify-between flex-row ">
          <DialogTitle className="text-right">
            {branch ? "تعديل الفرع" : "إضافة فرع جديد"}
          </DialogTitle>
          <DialogClose>
            <X />
          </DialogClose>
        </DialogHeader>
        <NewBranchFrom branch={branch} />
      </DialogContent>
    </Dialog>
  );
}
export default NewBranchButton;
