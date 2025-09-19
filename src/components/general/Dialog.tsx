import {
  DialogClose,
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
function Dialog({ children }: { children: React.ReactNode }) {
  return <DialogComponent>{children}</DialogComponent>;
}

function DialogTriggerButton({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}
function DialogContentBox({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <DialogContent showCloseButton={false} dir="rtl">
      <DialogHeader dir="rtl" className="flex flex-row justify-between">
        <div>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </div>
        <DialogClose>
          <X size={16} />
        </DialogClose>
      </DialogHeader>
      <Separator />
      {children}
    </DialogContent>
  );
}
function DialogFooter({ children }: { children: React.ReactNode }) {
  return <DialogFooter>{children}</DialogFooter>;
}

Dialog.Trigger = DialogTriggerButton;
Dialog.Content = DialogContentBox;
Dialog.Footer = DialogFooter;

export default Dialog;
