import { Plus } from "lucide-react";
import { useState } from "react";
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
  const [description, setDescription] = useState("");
  const onAddDocument = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
    formData.append("description", description);
    onSubmit(formData);
    setDescription("");
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
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
          <Input
            placeholder="أدخل اسم المستند"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button
            onClick={onAddDocument}
            variant="outline"
            size="sm"
            className="mr-auto flex"
            disabled={!description}
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
