"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";

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
  multiple?: boolean;
}

function Select({
  name,
  placeholder = "Select an option...",
  selectItems = [],
  disabled,
  className,
  size = "default",
  multiple = false,
}: SelectProps) {
  const router = useRouter();
  const searchParamsValues = useSearchParams();
  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    if (!multiple) return [];
    const param = searchParamsValues.get(name);
    return param ? param.split(",").filter(Boolean) : [];
  });

  const currentValue = React.useMemo(() => {
    if (multiple) {
      return selectedValues.join(",");
    }
    return searchParamsValues.get(name) || "";
  }, [multiple, selectedValues, name, searchParamsValues]);

  const handleSingleValueChange = (value: string) => {
    const searchParams = new URLSearchParams(searchParamsValues);
    searchParams.set(name, value);
    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  const handleMultipleValueChange = (value: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }
    setSelectedValues(newValues);

    const searchParams = new URLSearchParams(searchParamsValues);
    if (newValues.length > 0) {
      searchParams.set(name, newValues.join(","));
    } else {
      searchParams.delete(name);
    }
    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  const handleRemoveValue = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleMultipleValueChange(value, false);
  };

  const getSelectedLabels = () => {
    return selectItems
      .filter((item) => selectedValues.includes(String(item.value)))
      .map((item) => item.label);
  };

  if (multiple) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={size}
            disabled={disabled}
            className={`${className} h-fit max-w-sm flex-wrap justify-start font-normal`}
          >
            {selectedValues.length === 0 ? (
              <div className="text-muted-foreground flex flex-1 items-center justify-between">
                <span>{placeholder}</span>
                <ChevronDownIcon className="size-4" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {getSelectedLabels().map((label, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) =>
                        handleRemoveValue(selectedValues[index], e)
                      }
                    />
                  </Badge>
                ))}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-3" align="start" side="bottom">
          <ScrollArea dir="rtl" className="h-64 pl-5">
            <div className="space-y-2">
              {selectItems.map((item) => {
                const isChecked = selectedValues.includes(String(item.value));
                return (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${name}-${item.value}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleMultipleValueChange(String(item.value), !!checked)
                      }
                    />
                    <Label
                      htmlFor={`${name}-${item.value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {item.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <SelectRoot
      value={currentValue}
      disabled={disabled}
      onValueChange={handleSingleValueChange}
      dir={"rtl"}
    >
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
