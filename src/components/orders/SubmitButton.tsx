"use client";

import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
function SubmitButton() {
  const form = useOrderForm();
  const isSubmitting = form.formState.isSubmitting;
  const isValid = form.formState.isValid;

  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
    </Button>
  );
}
export default SubmitButton;
