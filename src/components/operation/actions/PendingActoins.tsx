"use client";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Actions() {
  const onChange = (value: string) => {
    console.log(value);
  };
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="اختر الإجراء المطلوب" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  );
}
export default Actions;
