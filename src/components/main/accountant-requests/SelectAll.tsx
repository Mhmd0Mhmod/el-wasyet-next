"use client";

import { useAccountantRequests } from "@/components/providers/AccountantRequestsProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function SelectAll() {
  const { isAllSelected, toggleSelectAll } = useAccountantRequests();
  return (
    <div className="flex h-full items-center justify-start">
      <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
      <Label className="mr-2 select-none">تحديد الجميع</Label>
    </div>
  );
}
export default SelectAll;
