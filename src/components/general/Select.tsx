"use client";
import * as React from "react";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type SelectItem = {
  label: string;
  value: string | number;
};

interface SelectProps {
  name: string;
  placeholder?: string;
  selectItems?: SelectItem[];
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default";
}

function Select({
  name,
  placeholder = "Select an option...",
  selectItems = [],
  disabled,
  className,
  size = "default",
}: SelectProps) {
  const router = useRouter();
  const searchParamsValues = useSearchParams();

  const handleValueChange = (value: string) => {
    const searchParams = new URLSearchParams(searchParamsValues);
    searchParams.set(name, value);
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <SelectRoot disabled={disabled} onValueChange={handleValueChange}>
      <SelectTrigger className={className} size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={String(item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default Select;
