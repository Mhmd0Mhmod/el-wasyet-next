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

interface FormFieldProps<T extends FieldValues, N extends FieldPath<T>> {
  className?: string;
  label?: string;
  description?: string;
  name: N;
  render: (props: { field: ControllerRenderProps<T, N> }) => React.ReactNode;
}

export function createFormField<T extends FieldValues>(form: UseFormReturn<T>) {
  return function TypedFormField<N extends FieldPath<T>>({
    className,
    label,
    description,
    name,
    render,
  }: FormFieldProps<T, N>) {
    return (
      <FormField
        name={name}
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
