import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

export type StatisticsCardProps = {
  title: string;
  className?: ClassNameValue;
  IconComponent: LucideIcon;
  header: {
    title: string;
    value: string;
  };
  description: {
    title: string;
    value: string;
  }[];
};

function StatisticsCard({
  title,
  IconComponent,
  header,
  description,
  className,
}: StatisticsCardProps) {
  return (
    <Card className={cn(className, "border-2 border-black/5")}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title} </CardTitle>
        <div className="rounded-md border p-1 shadow-md">
          <IconComponent />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center-safe justify-between">
          <h3 className="text-lg font-semibold">{header.title}</h3>
          <p className="text-xl font-bold">{header.value}</p>
        </div>
        <div>
          {description.map((desc, index) => (
            <div key={index} className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{desc.title}</h4>
              <p className="text-muted-foreground text-sm">{desc.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default StatisticsCard;
