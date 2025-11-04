import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

interface NotesCardProps {
  notes: string;
}

function NotesCard({ notes }: NotesCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <StickyNote className="h-4 w-4 text-green-600" />
          </div>
          الملاحظات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm leading-relaxed text-gray-700">{notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default NotesCard;
