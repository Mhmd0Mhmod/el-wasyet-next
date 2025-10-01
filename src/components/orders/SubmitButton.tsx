"use client";

import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
function SubmitButton() {
  const form = useOrderForm();
  const isSubmitting = form.formState.isSubmitting;
  console.log(form.watch());

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
    </Button>
  );
}
export default SubmitButton;
