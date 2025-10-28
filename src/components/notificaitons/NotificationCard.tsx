import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Notification } from "@/types/notification";

interface NotificationCardProps {
  notification: Notification;
  onToggle: (notification: Notification) => void;
}

export function NotificationCard({
  notification,
  onToggle,
}: NotificationCardProps) {
  return (
    <Card
      className={notification.isRead ? "" : "border-purple-200 bg-purple-50"}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm">{notification.type}</CardTitle>
          {!notification.isRead && (
            <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm">
          {notification.message}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            {notification.date}
          </span>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-purple-600"
            onClick={() => onToggle(notification)}
          >
            {notification.isRead ? "تحت الفراعة" : "تحديد كمقروء"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
