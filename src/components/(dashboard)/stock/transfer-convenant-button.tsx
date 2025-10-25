"use client";
import { transferConvenant } from "@/actions/stock/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployees } from "@/hooks/use-employees";
import { useState } from "react";
import { toast } from "sonner";

function TransferCovenant() {
  const { data: employees } = useEmployees();
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>();
  function onSelectChange(value: string) {
    const id = toast.loading("جاري تحويل العهده...");
    setSelectedEmployee(value);
    setLoading(true);
    transferConvenant(value)
      .then(() => {
        toast.success("تم تحويل العهده بنجاح", {
          id,
        });
      })
      .catch((error) => {
        toast.error(`حدث خطأ: ${error.message}`, { id });
      })
      .finally(() => {
        setSelectedEmployee("");
        setLoading(false);
      });
  }
  return (
    <Select value={selectedEmployee} onValueChange={onSelectChange}>
      <SelectTrigger
        dir="rtl"
        className="w-48 disabled:bg-gray-500"
        disabled={loading}
      >
        <SelectValue placeholder="تحويل العهده" />
      </SelectTrigger>
      <SelectContent>
        {employees?.map((employee) => (
          <SelectItem key={employee.id} value={employee.id.toString()}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default TransferCovenant;
