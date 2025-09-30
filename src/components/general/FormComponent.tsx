import {
  FieldPath,
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Skeleton } from "../ui/skeleton";

interface FormFieldProps<T extends FieldValues, N extends FieldPath<T>> {
  className?: string;
  isLoading?: boolean;
  label?: string;
  description?: string;
  name: N;
  render: (props: { field: ControllerRenderProps<T, N> }) => React.ReactNode;
  disabled?: boolean;
}

export function createFormField<T extends FieldValues>(form: UseFormReturn<T>) {
  return function TypedFormField<N extends FieldPath<T>>({
    className,
    label,
    description,
    name,
    isLoading = false,
    render,
    disabled = false,
  }: FormFieldProps<T, N>) {
    if (isLoading) return <Skeleton className="h-10 w-full rounded-md" />;
    return (
      <FormField
        name={name}
        disabled={form.formState.isSubmitting || disabled}
        control={form.control}
        render={(fieldProps) => {
          const { field } = fieldProps as {
            field: ControllerRenderProps<T, N>;
          };
          return (
            <FormItem className={className}>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>{render({ field })}</FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  };
}
