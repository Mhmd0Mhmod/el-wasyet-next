"use client";
import { useFieldArray } from "react-hook-form";
import { useRef, useState } from "react";
import Dialog from "../general/Dialog";
import { OrderFormField, useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trash2, Upload, FileText } from "lucide-react";

function UploadDocumentButton() {
  const form = useOrderForm();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "CreateFiles",
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddFile = () => {
    if (selectedFile && selectedFileType) {
      append({
        fileTypeId: parseInt(selectedFileType),
        file: selectedFile,
      });
      setSelectedFile(null);
      setSelectedFileType("");
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    remove(index);
  };

  return (
    <Dialog>
      <Dialog.Trigger>
        <Button type="button" variant="outline">
          رفع المستندات
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="رفع المستندات">
        <div className="space-y-6">
          {/* File Upload Section using shadcn Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">إضافة ملف جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="file-input">اختر الملف</Label>
                  <Input
                    id="file-input"
                    type="file"
                    ref={fileRef}
                    onChange={handleFileSelect}
                    accept="*/*"
                  />
                </div>

                <div className="space-y-2">
                  <Label>نوع الملف</Label>
                  <Select
                    value={selectedFileType}
                    onValueChange={setSelectedFileType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر نوع الملف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">ملف مدخل</SelectItem>
                      <SelectItem value="2">ملف مخرج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAddFile}
                disabled={!selectedFile || !selectedFileType}
                className="w-full"
              >
                <Upload className="ml-2 h-4 w-4" />
                إضافة الملف
              </Button>
            </CardContent>
          </Card>

          {/* Uploaded Files List using OrderFormField */}
          <OrderFormField
            name="CreateFiles"
            label="الملفات المرفوعة"
            render={() => (
              <div className="space-y-4">
                {fields.length > 0 ? (
                  <div className="space-y-3">
                    {fields.map((field, index) => {
                      const fileTypeLabel =
                        field.fileTypeId === 1 ? "ملف مدخل" : "ملف مخرج";
                      const badgeVariant =
                        field.fileTypeId === 1 ? "default" : "secondary";

                      return (
                        <Card key={field.id} className="p-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <FileText className="text-primary h-8 w-8" />
                                <div className="flex-1 space-y-2">
                                  <div className="text-sm font-medium">
                                    {field.file.name}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Badge variant={badgeVariant}>
                                      {fileTypeLabel}
                                    </Badge>
                                    <span className="text-muted-foreground text-xs">
                                      {(field.file.size / 1024).toFixed(1)} KB
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile(index)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex items-center justify-center py-8">
                      <div className="text-muted-foreground text-center">
                        <FileText className="mx-auto mb-2 h-12 w-12 opacity-50" />
                        <p>لم يتم رفع أي ملفات بعد</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
export default UploadDocumentButton;
