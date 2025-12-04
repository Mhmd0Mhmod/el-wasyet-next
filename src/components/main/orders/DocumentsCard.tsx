import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";

interface DocumentItem {
  id: number;
  name: string;
  checked: boolean;
}

interface DocumentsCardProps {
  documents: DocumentItem[];
}

function DocumentsCard({ documents }: DocumentsCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          المستندات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {documents.map((document) => (
            <div key={document.id} className="flex items-center gap-3">
              <Checkbox
                id={`document-${document.id}`}
                checked={document.checked}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
              />
              <label
                htmlFor={`document-${document.id}`}
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {document.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentsCard;
