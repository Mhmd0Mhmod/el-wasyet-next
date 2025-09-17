import { Input as InputComponent } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconNode, LucideIcon, LucideProps } from "lucide-react";
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
  console.log("eh");

  return (
    <div className={cn("w-full relative", container)}>
      <InputComponent className={cn(className)} {...props} />
      {Icon && (
        <Icon
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
          color="gray"
          size={20}
        />
      )}
    </div>
  );
}
export default Input;
