import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3 } from "lucide-react";

interface RequiredChangesCardProps {
  requiredChanges: string;
}

function RequiredChangesCard({ requiredChanges }: RequiredChangesCardProps) {
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
            <Edit3 className="h-4 w-4 text-orange-600" />
          </div>
          المطلوب تغييره
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-yellow-100 p-4">
          <p className="text-sm leading-relaxed font-medium text-gray-700">
            {requiredChanges}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default RequiredChangesCard;
