import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { Input } from "../../ui/input";

function AddDocumentForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const form = useForm({
    defaultValues: { description: "" },
  });
  const onAddDocument = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit((data) => {
      const formData = new FormData();
      formData.append("description", data.description);
      onSubmit(formData);
      form.reset();
    })();
  };
  const disabled = !form.watch("description");
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
          <Input
            placeholder="أدخل اسم المستند"
            {...form.register("description")}
          />
          <Button
            onClick={onAddDocument}
            variant="outline"
            size="sm"
            className="mr-auto flex"
            disabled={disabled}
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
