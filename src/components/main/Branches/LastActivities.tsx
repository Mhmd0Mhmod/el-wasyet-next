import { Badge } from "@/components/ui/badge";
import { ACTIVITIES_DATA } from "@/data/branch-last-activity";

function LastActivities() {
  return (
    <div className="space-y-4">
      {ACTIVITIES_DATA.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
        >
          <div className="space-y-1 text-right">
            <h3 className="font-medium text-gray-900">{activity.title}</h3>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={
                activity.status === "completed" ? "secondary" : "outline"
              }
              className={
                activity.status === "completed"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-100"
              }
            >
              {activity.status === "completed" ? "مكتمل" : "قيد التنفيذ"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastActivities;
