import { Mail, User } from "lucide-react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

function UserProfileDetails({ user }: { user?: Session["user"] }) {
  if (!user) {
    return null;
  }

  const { email, name, image } = user;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={image || ""} alt={name || "User"} />
        <AvatarFallback className="bg-primary/10">
          <User className="text-primary h-6 w-6" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <h3 className="truncate text-sm font-semibold">{name || "المستخدم"}</h3>
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Mail className="h-3 w-3 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      </div>
    </div>
  );
}
export default UserProfileDetails;
