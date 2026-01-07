"use client";
import { OrderFormValues } from "@/schema/order";
import { FileText, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Dialog from "../../shared/Dialog";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

function UploadDocumentButton() {
  const form = useFormContext<OrderFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "CreateFiles",
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
  };

  const handleAddFiles = () => {
    if (selectedFiles.length > 0 && selectedFileType) {
      selectedFiles.forEach((file) => {
        append({
          FileTypeId: parseInt(selectedFileType),
          File: file,
        });
      });
      setSelectedFiles([]);
      setSelectedFileType("");
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    remove(index);
  };
  const handleRemovePreivewFile = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    e.stopPropagation();
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    const selectedPreivewRefFiles = fileRef.current?.files;
    if (selectedPreivewRefFiles) {
      const dataTransfer = new DataTransfer();
      Array.from(selectedPreivewRefFiles)
        .filter((_, i) => i !== index)
        .forEach((file) => dataTransfer.items.add(file));
      if (fileRef.current) {
        fileRef.current.files = dataTransfer.files;
      }
    }
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
              <CardTitle className="text-lg">إضافة صور جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="file-input">اختر الصور</Label>
                  <Input
                    id="file-input"
                    type="file"
                    ref={fileRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    multiple
                  />
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedFiles.map((file, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {file.name}
                          <span
                            className="text-muted-foreground hover:text-destructive ml-1 cursor-pointer"
                            title="إزالة الصورة"
                            onClick={(e) => handleRemovePreivewFile(idx, e)}
                          >
                            ×
                          </span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>نوع الصور</Label>
                  <Select
                    value={selectedFileType}
                    onValueChange={setSelectedFileType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر نوع الصور" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">ملف مدخل (كل الصور)</SelectItem>
                      <SelectItem value="2">ملف مخرج (كل الصور)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAddFiles}
                disabled={selectedFiles.length === 0 || !selectedFileType}
                className="w-full"
              >
                <Upload className="ml-2 h-4 w-4" />
                إضافة الصور
              </Button>
            </CardContent>
          </Card>

          {/* Uploaded Files List */}
          <div className="space-y-2">
            <Label>الملفات المرفوعة</Label>
            <ScrollArea className="max-h-50 overflow-auto rounded-md border p-2">
              <div className="space-y-4">
                {fields.length > 0 ? (
                  <div className="space-y-3">
                    {fields.map((field, index) => {
                      const fileTypeLabel =
                        field.FileTypeId === 1 ? "ملف مدخل" : "ملف مخرج";
                      const badgeVariant =
                        field.FileTypeId === 1 ? "default" : "secondary";

                      return (
                        <Card key={field.id} className="p-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <FileText className="text-primary h-8 w-8" />
                                <div className="flex-1 space-y-2">
                                  <div className="text-sm font-medium">
                                    {field.File && field.File.name}
                                    {!field.File && field.fileUrl && (
                                      <span>
                                        {field.fileUrl.split("/").pop()}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Badge variant={badgeVariant}>
                                      {fileTypeLabel}
                                    </Badge>
                                    {field.File && (
                                      <span>
                                        {(field.File.size / 1024).toFixed(2)} KB
                                      </span>
                                    )}
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
            </ScrollArea>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
export default UploadDocumentButton;
