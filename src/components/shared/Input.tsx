import { Input as InputComponent } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
function Input({
  className,
  container,
  Icon,
  IconProps,
  props,
}: {
  className?: ClassNameValue;
  container?: ClassNameValue;
  Icon?: LucideIcon;
  IconProps?: LucideProps;
  props: React.ComponentProps<typeof InputComponent>;
}) {
  const inputProps = {
    ...props,
    value: props.value ?? "",
  };
  return (
    <div className={cn("relative w-full", container)}>
      <InputComponent className={cn(className)} {...inputProps} />
      {Icon && (
        <Icon
          color="gray"
          size={20}
          {...IconProps}
          className={cn(
            "absolute top-1/2 left-2 -translate-y-1/2 transform",
            IconProps?.className,
          )}
        />
      )}
    </div>
  );
}
export default Input;
