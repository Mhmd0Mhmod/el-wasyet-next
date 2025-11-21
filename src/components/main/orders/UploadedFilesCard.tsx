import { Separator } from "@/components/ui/separator";
import { getFullURL } from "@/lib/helper";
import { OrderDetails } from "@/types/order";
import { FileText } from "lucide-react";
import Link from "next/link";

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
              <Link
                href={getFullURL(file.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary max-w-1/2 text-center text-xs text-ellipsis text-gray-600 hover:underline"
              >
                {file.fileUrl.split("/").pop()}
              </Link>
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
                <FileText className="h-6 w-6 text-gray-500" />
              </div>
              <Link
                href={getFullURL(file.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-center text-xs text-gray-600 hover:underline"
              >
                {file.fileUrl.split("/").pop()}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UploadedFilesCard;
