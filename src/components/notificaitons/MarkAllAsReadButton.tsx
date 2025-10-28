import { Button } from "../ui/button";

interface MarkAllAsReadButtonProps {
  onClick: () => void;
}

export function MarkAllAsReadButton({ onClick }: MarkAllAsReadButtonProps) {
  return (
    <div className="pt-4">
      <Button className="w-full" size="lg" onClick={onClick}>
        تحديد الكل كمقروء
      </Button>
    </div>
  );
}
