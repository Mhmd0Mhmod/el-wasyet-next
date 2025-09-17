import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
function NotificationButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="relative">
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>Notification 1</div>
        <div>Notification 2</div>
      </PopoverContent>
    </Popover>
  );
}
export default NotificationButton;
