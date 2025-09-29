import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function AddDocumentForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const onAddDocumentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit?.(formData);
  };
  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger className="w-full" asChild>
        <Button variant="outline" size="sm">
          <Plus className="ml-2 h-4 w-4" />
          إضافة مستند
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <form onSubmit={onAddDocumentFormSubmit} className="max-w-sm space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input name="name" placeholder="أدخل اسم المستند" />
            <Input name="quantity" placeholder="أدخل كميه " pattern="[0-9]*" />
          </div>
          <Textarea name="description" placeholder="أدخل تفاصيل المستند" />
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="mr-auto flex"
          >
            <Plus className="ml-2 h-4 w-4" />
            <span>إضافة</span>
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
export default AddDocumentForm;
