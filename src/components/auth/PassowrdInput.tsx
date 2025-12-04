import { useState } from "react";
import Input from "../shared/Input";
import { ControllerRenderProps } from "react-hook-form";
import { LoginFormValues } from "@/schema/login";
import { EyeClosed, EyeIcon } from "lucide-react";

function PassowrdInput({
  field,
}: {
  field: ControllerRenderProps<LoginFormValues>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<string>("");
  const passwordStars = Array.from({ length: value.length }).fill("*").join("");

  return (
    <Input
      props={{
        placeholder: "كلمة المرور",
        type: "text",
        autoComplete: "new-password",
        value: showPassword ? value : passwordStars,
        onChange: (e) => {
          setValue(e.target.value);
          field.onChange(e);
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
export default PassowrdInput;
