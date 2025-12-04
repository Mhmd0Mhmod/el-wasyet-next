"use client";
import { Trash2Icon } from "lucide-react";
import { memo, useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Skeleton } from "../../ui/skeleton";
import AddDocumentForm from "./AddDocumentForm";
const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-3/4 rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
});
function DocumentSelector() {
  const { form, service, isLoadingService } = useOrderForm();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "CustomDocuments",
  });
  const documentsIds = form.watch("Documents");

  const handleDocumentChange = useCallback(
    (documentId: string, isChecked: boolean) => {
      const id = parseInt(documentId, 10);
      const currentDocuments = documentsIds;
      if (isChecked) {
        form.setValue("Documents", [...currentDocuments, id]);
      } else {
        form.setValue(
          "Documents",
          currentDocuments.filter((docId) => docId !== id),
        );
      }
    },
    [form, documentsIds],
  );

  const addCustomDocument = useCallback(
    (formData: FormData) => {
      const description = formData.get("description") as string;
      if (!description) return;
      append({
        Description: description,
      });
    },
    [append],
  );
  const onRemoveCustomDocument = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const { documents: documentsServcie } = service || { documents: [] };

  return (
    <Card className="max-w-sm min-w-sm">
      <CardHeader>
        <CardTitle>المستندات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!!service?.id ? (
          <>
            {isLoadingService && <LoadingSkeleton />}
            {!isLoadingService && documentsServcie.length !== 0 && (
              <div className="space-y-2">
                {documentsServcie.map((doc) => {
                  const isChecked = documentsIds.includes(doc.id);
                  return (
                    <div key={doc.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`doc-${doc.id}`}
                        checked={isChecked}
                        onClick={() =>
                          handleDocumentChange(doc.id.toString(), !isChecked)
                        }
                      />
                      <Label
                        htmlFor={`doc-${doc.id}`}
                        className="cursor-pointer"
                      >
                        {doc.description}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
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
