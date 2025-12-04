"use client";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { Button } from "../../ui/button";

function ResetButton() {
  const { form } = useOrderForm();
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
