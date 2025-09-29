import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Download, Printer } from "lucide-react";

interface UploadedFile {
  id: number;
  name: string;
  type: "document" | "output";
}

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
  outputFiles: UploadedFile[];
}

function UploadedFilesCard({
  uploadedFiles,
  outputFiles,
}: UploadedFilesCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          الملفات المحملة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الملفات المحذة - Uploaded Files */}
        <div>
          <h4 className="mb-4 text-center font-semibold text-gray-700">
            الملفات المحذة
          </h4>
          <div className="grid grid-cols-5 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex flex-col items-center space-y-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                  <FileText className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-center text-xs text-gray-600">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* الملفات المخرجه - Output Files */}
        <div>
          <h4 className="mb-4 text-center font-semibold text-gray-700">
            الملفات المخرجه
          </h4>
          <div className="grid grid-cols-5 gap-4">
            {outputFiles.map((file) => (
              <div
                key={file.id}
                className="flex flex-col items-center space-y-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-center text-xs text-gray-600">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Printer className="ml-2 h-4 w-4" />
            طباعة الفاتورة
          </Button>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Download className="ml-2 h-4 w-4" />
            تحميل PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UploadedFilesCard;
