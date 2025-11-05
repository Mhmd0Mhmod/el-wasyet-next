"use client";
import { verifyCode } from "@/actions/[operations]/action";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OrderByStatus } from "@/types/order";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function SendCode({ order }: { order: OrderByStatus }) {
  const [code, setCode] = useState("");
  const disabled = code.length < 6;
  const handleClick = useCallback(async () => {
    const id = toast.loading("جاري التحقق من الكود...");
    try {
      const res = await verifyCode(order.orderId, code);
      if (res.success) {
        toast.success(res.message, { id });
        setCode("");
      } else {
        toast.error(res.message || "حدث خطأ أثناء التحقق من الكود", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء التحقق من الكود", { id });
    }
  }, [order.orderId, code]);
  return (
    <div className="flex flex-col items-center space-y-5">
      <p> تم إرسال كود مكون من 6 أرقام</p>
      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup dir="rtl" className="flex-row-reverse">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p>الرجاء إدخال رمز التحقق أدناه:</p>
      <Button className="w-3/4" onClick={handleClick} disabled={disabled}>
        تأكيد
      </Button>
    </div>
  );
}
export default SendCode;
