"use client";
import { useOperations } from "@/components/providers/OperationsProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

function SelectOrderCheckbox({ orderId }: { orderId: number }) {
  const { operations, removeOperation } = useOperations();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (operations.find((op) => op.orderId === orderId)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [operations, orderId]);
  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    if (!checked) {
      removeOperation(orderId);
    }
  };

  return (
    <div>
      <Checkbox
        checked={isChecked}
        disabled={!isChecked}
        onCheckedChange={handleChange}
      />
    </div>
  );
}
export default SelectOrderCheckbox;
