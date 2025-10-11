"use client";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

// Simple action type
interface Action {
  label: string;
  onClick: () => void;
}

// Predefined action groups
const ACTIONS = {
  pendingOrders: [
    { label: "أمر جديد (م)", onClick: () => console.log("New Order") },
    { label: "إلغاء (ض)", onClick: () => console.log("Cancel") },
    { label: "استرداد نقدي", onClick: () => console.log("Cash Refund") },
    { label: "استرداد ائتماني", onClick: () => console.log("Credit Refund") },
  ],
  newOrders: [
    { label: "طلب مصاريف", onClick: () => console.log("Ask for expenses") },
  ],
  collectionDone: [
    { label: "تحت المعالجة", onClick: () => console.log("Under Processing") },
    { label: "استيفاء عميل", onClick: () => console.log("Stefa Client") },
    { label: "استيفاء شهادة", onClick: () => console.log("Stefa Certificate") },
    { label: "إرجاع نقدي", onClick: () => console.log("Return Cash") },
    { label: "إرجاع ائتماني", onClick: () => console.log("Return Credit") },
  ],
  underProcessing: [
    { label: "مكتمل", onClick: () => console.log("Completed") },
    { label: "استيفاء SGL", onClick: () => console.log("Stefa SGL") },
    { label: "إرجاع نقدي", onClick: () => console.log("Return Cash") },
    { label: "إرجاع ائتماني", onClick: () => console.log("Return Credit") },
  ],
  completedOrders: [
    { label: "تم الاتصال", onClick: () => console.log("Contacted") },
  ],
  receivingOrders: [
    { label: "إرسال الرمز", onClick: () => console.log("Send Code") },
    { label: "كتابة الرمز", onClick: () => console.log("Write Code") },
    { label: "تم الاستلام", onClick: () => console.log("Receiving Done") },
  ],
};

interface ActionsButtonsProps {
  orderId: number;
  actionGroup: keyof typeof ACTIONS;
  onActionClick?: (action: string, orderId: number) => void;
}

function ActionsButtons({
  orderId,
  actionGroup,
  onActionClick,
}: ActionsButtonsProps) {
  const actions = ACTIONS[actionGroup] || [];

  const handleClick = (action: Action) => {
    action.onClick();
    onActionClick?.(action.label, orderId);
  };

  if (actions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVerticalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            <DropdownMenuItem onClick={() => handleClick(action)}>
              {action.label}
            </DropdownMenuItem>
            {index < actions.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsButtons;
