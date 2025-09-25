import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  containerClassName?: string;
}

function Spinner({ size = "md", className, containerClassName }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
    xl: "w-12 h-12 border-4",
  };

  return (
    <div className={cn("flex items-center justify-center", containerClassName)}>
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-gray-300 border-t-blue-600",
          sizeClasses[size],
          className,
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
