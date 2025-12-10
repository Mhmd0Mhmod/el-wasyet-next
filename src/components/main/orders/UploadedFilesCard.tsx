import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getFullURL } from "@/lib/helper";
import { OrderDetails } from "@/types/order";
import { FileText, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UploadedFilesCardProps {
  files: OrderDetails["files"];
}

function isImageFile(fileUrl: string): boolean {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  const lowerCaseUrl = fileUrl.toLowerCase();
  return imageExtensions.some((ext) => lowerCaseUrl.endsWith(ext));
}

function UploadedFilesCard({ files }: UploadedFilesCardProps) {
  const uploadedFiles = files.filter((file) => file.fileTypeID === 1);
  const outputFiles = files.filter((file) => file.fileTypeID === 2);

  return (
    <div className="space-y-8">
      {/* الملفات الداخله - Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-center text-lg font-semibold text-gray-800">
            الملفات الداخله
          </h4>
          <ScrollArea
            className="w-full rounded-lg border bg-linear-to-br from-gray-50 to-gray-100/50 p-4 whitespace-nowrap"
            dir="rtl"
          >
            <div className="flex gap-4">
              {uploadedFiles.map((file, index) => (
                <FileCard
                  key={file.id}
                  file={file}
                  index={index}
                  isImage={isImageFile(file.fileUrl)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && outputFiles.length > 0 && (
        <Separator className="my-6" />
      )}

      {/* الملفات المخرجه - Output Files */}
      {outputFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-center text-lg font-semibold text-gray-800">
            الملفات المخرجه
          </h4>
          <ScrollArea
            dir="rtl"
            className="w-full rounded-lg border bg-linear-to-br from-blue-50 to-blue-100/50 p-4 whitespace-nowrap"
          >
            <div className="flex gap-4 pb-4">
              {outputFiles.map((file, index) => (
                <FileCard
                  key={file.id}
                  file={file}
                  index={index}
                  isImage={isImageFile(file.fileUrl)}
                  isOutput
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default UploadedFilesCard;

interface FileCardProps {
  file: OrderDetails["files"][0];
  index: number;
  isImage: boolean;
  isOutput?: boolean;
}

function FileCard({ file, index, isImage, isOutput = false }: FileCardProps) {
  const fileName = file.fileUrl.split("/").pop() || `ملف ${index + 1}`;

  return (
    <div
      className={cn(
        "group animate-in fade-in-0 slide-in-from-bottom-4 relative inline-block p-2",

        "transition-all duration-300 hover:scale-105",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col items-center space-y-2">
        {isImage ? (
          <ImageDialog url={file.fileUrl} index={index} />
        ) : (
          <Link
            href={getFullURL(file.fileUrl)}
            target="_blank"
            download={fileName}
            rel="noopener noreferrer"
            className="block"
          >
            <div
              className={cn(
                "relative flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 shadow-sm transition-all duration-300",
                "hover:border-primary/50 hover:shadow-lg",
                isOutput
                  ? "border-blue-200 bg-blue-50/80 hover:bg-blue-100/80"
                  : "border-gray-200 bg-white hover:bg-gray-50",
              )}
            >
              <FileText className="group-hover:text-primary h-10 w-10 text-gray-600 transition-colors" />
              <Download className="h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:opacity-100" />
            </div>
          </Link>
        )}
        <p
          className={cn(
            "max-w-32 truncate text-center text-xs font-medium transition-colors",
            isOutput ? "text-blue-700" : "text-gray-700",
            "group-hover:text-primary",
          )}
          title={fileName}
        >
          {fileName}
        </p>
      </div>
    </div>
  );
}

function ImageDialog({ url, index }: { url: string; index: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <div className="hover:border-primary/50 relative h-32 w-32 overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
            <Image
              src={getFullURL(url)}
              alt={`صورة ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="128px"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/5" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            معاينة الصورة
          </DialogTitle>
        </DialogHeader>
        <div className="relative h-[70vh] w-full">
          <Image
            src={getFullURL(url)}
            alt={`صورة ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
