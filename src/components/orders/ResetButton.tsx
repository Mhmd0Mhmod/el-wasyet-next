"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

function ResetButton() {
  const form = useFormContext();
  function onReset() {
    form.reset();
  }
  return (
    <Button type="reset" variant="outline" onClick={onReset}>
      ألغاء
    </Button>
  );
}
export default ResetButton;
