"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
function SubmitButton() {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;
  console.log(form.getValues());
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
    </Button>
  );
}
export default SubmitButton;
