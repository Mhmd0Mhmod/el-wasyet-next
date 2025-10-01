import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";

function AddDocumentForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const form = useForm({
    defaultValues: { name: "" },
  });
  const onAddDocument = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit((data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      onSubmit(formData);
    })();
    form.reset();
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
        <div className="max-w-sm space-y-2">
          <Input placeholder="أدخل اسم المستند" {...form.register("name")} />
          <Button
            onClick={onAddDocument}
            variant="outline"
            size="sm"
            className="mr-auto flex"
          >
            <Plus className="ml-2 h-4 w-4" />
            <span>إضافة</span>
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
export default AddDocumentForm;
