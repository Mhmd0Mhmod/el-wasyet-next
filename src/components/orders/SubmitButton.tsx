"use client";

import { useOrderForm } from "../providers/OrderFormProvider";
import { Button } from "../ui/button";
function SubmitButton() {
  const form = useOrderForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "جاري الحفظ..." : "حفظ الطلب"}
    </Button>
  );
}
export default SubmitButton;
