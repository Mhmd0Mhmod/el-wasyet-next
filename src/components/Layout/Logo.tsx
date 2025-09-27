import LogoWithText from "@/assets/logo-with-text.png";
import LogoImage from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
function Logo({
  className,
  withText = false,
  ...props
}: {
  className?: string;
  withText?: boolean;
} & Partial<ImageProps>) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={withText ? LogoWithText : LogoImage}
        alt="El-Wasyet Logo"
        width={props?.width ?? (withText ? 150 : 100)}
        height={props.height ?? 100}
      />
    </div>
  );
}
export default Logo;
