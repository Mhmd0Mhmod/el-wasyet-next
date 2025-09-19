import { Input as InputComponent } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
function Input({
  className,
  container,
  Icon,
  props,
}: {
  className?: ClassNameValue;
  container?: ClassNameValue;
  Icon?: LucideIcon;
  IconProps?: LucideProps;
  props: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className={cn("relative w-full", container)}>
      <InputComponent className={cn(className)} {...props} />
      {Icon && (
        <Icon
          className="absolute top-1/2 left-2 -translate-y-1/2 transform"
          color="gray"
          size={20}
        />
      )}
    </div>
  );
}
export default Input;
