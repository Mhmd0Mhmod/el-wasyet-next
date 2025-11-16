import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { getCurrentUser } from "@/actions/auth/actions";
import LogoutButton from "./logout-button";

async function UserProfileButton() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const { email, name, image } = user;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={image || ""} alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </div>
        </div>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
export default UserProfileButton;
