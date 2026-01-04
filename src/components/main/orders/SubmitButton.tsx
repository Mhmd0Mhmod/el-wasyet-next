"use client";

import { useFormState } from "react-hook-form";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { Button } from "../../ui/button";
function SubmitButton() {
  const { form } = useOrderForm();
  const { isSubmitting, isLoading } = useFormState({ control: form.control });
  return (
    <Button
      type="submit"
      disabled={isSubmitting || isLoading}
      className="w-full md:w-auto"
    >
      {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
    </Button>
  );
}
export default SubmitButton;
