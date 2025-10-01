"use client";
import { useService } from "@/hooks/useService";
import { OrderFormValues } from "@/schema/order";
import { Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import AddDocumentForm from "./AddDocumentForm";

function DocumentSelector() {
  const form = useFormContext<OrderFormValues>();
  const serviceId = form.watch("ServiceId");
  const documents = form.watch("Documents") || [];
  const { isLoading, service } = useService(serviceId);
  const LoadingSkeleton = (
    <div className="space-y-2">
      <Skeleton className="h-8 w-3/4 rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
  function handleDocumentChange(docId: string, isChecked: boolean) {
    const docIdNumber = parseInt(docId);
    const updatedDocuments = isChecked
      ? [...documents, docIdNumber]
      : documents.filter((id) => id !== docIdNumber);
    form.setValue("Documents", updatedDocuments);
  }
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "CustomDocuments",
  });
  function addCustomDocument(formData: FormData) {
    const description = formData.get("description") as string;
    if (!description) return;
    append({
      Description: description,
    });
  }
  function onRemoveCustomDocument(index: number) {
    remove(index);
  }

  const { documents: documentsServcie } = service || { documents: [] };
  return (
    <Card className="max-w-sm min-w-sm">
      <CardHeader>
        <CardTitle>المستندات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!!service?.id ? (
          <>
            {isLoading && LoadingSkeleton}
            {!isLoading && documentsServcie.length !== 0 && (
              <div className="space-y-2">
                {documentsServcie.map((doc) => {
                  const isChecked = documents.includes(doc.id);
                  return (
                    <div key={doc.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`doc-${doc.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleDocumentChange(doc.id.toString(), !!checked)
                        }
                      />
                      <Label htmlFor={`doc-${doc.id}`}>{doc.description}</Label>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Display Custom Documents */}
            {fields.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">المستندات المخصصة</h4>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{field.Description}</div>
                    </div>
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      onClick={() => onRemoveCustomDocument(index)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <AddDocumentForm onSubmit={addCustomDocument} />
          </>
        ) : (
          <>
            <h3>أختر خدمه لتحديد المستندات</h3>
          </>
        )}
      </CardContent>
    </Card>
  );
}
export default DocumentSelector;
