import { useState } from "react";
import Input from "../shared/Input";
import { ControllerRenderProps } from "react-hook-form";
import { LoginFormValues } from "@/schema/login";
import { EyeClosed, EyeIcon } from "lucide-react";

function PasswordInput({
  field,
}: {
  field: ControllerRenderProps<LoginFormValues>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      props={{
        placeholder: "كلمة المرور",
        type: "text",
        autoComplete: "new-password",
        value: showPassword
          ? field.value
          : "•".repeat(field.value?.length || 0),
        onChange: (e) => {
          if (showPassword) {
            field.onChange(e.target.value);
          } else {
            const newLength = e.target.value.length;
            const oldLength = field.value?.length || 0;

            if (newLength > oldLength) {
              // Character added - get the new character(s)
              const addedChars = e.target.value.slice(oldLength);
              field.onChange((field.value || "") + addedChars);
            } else {
              // Characters removed - trim from the end
              field.onChange((field.value || "").slice(0, newLength));
            }
          }
        },
      }}
      Icon={showPassword ? EyeIcon : EyeClosed}
      IconProps={{
        className: "cursor-pointer",
        onClick: () => setShowPassword((prev) => !prev),
      }}
    />
  );
}
export default PasswordInput;
