import { Separator } from "@/components/ui/separator";
import { OrderDetails } from "@/types/order";
import { FileText, User } from "lucide-react";

interface UploadedFilesCardProps {
  files: OrderDetails["files"];
}

function UploadedFilesCard({ files }: UploadedFilesCardProps) {
  const uploadedFiles = files.filter((file) => file.fileTypeID === 1);
  const outputFiles = files.filter((file) => file.fileTypeID === 2);

  return (
    <>
      <div>
        <h4 className="mb-4 text-center font-semibold text-gray-700">
          الملفات الداخله
        </h4>
        <div className="grid grid-cols-5 gap-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex flex-col items-center space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                <FileText className="h-6 w-6 text-gray-500" />
              </div>
              <span className="max-w-1/2 text-center text-xs text-ellipsis text-gray-600">
                {file.fileUrl.split("/").pop()}
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
            <div key={file.id} className="flex flex-col items-center space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <span className="text-center text-xs text-gray-600">
                {file.fileUrl.split("/").pop()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UploadedFilesCard;
