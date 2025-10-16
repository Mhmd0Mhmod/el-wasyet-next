"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OrderByStatus } from "@/types/order";
import { useState } from "react";

function SendCode({ order }: { order: OrderByStatus }) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">(
    "idle",
  );

  const disabled = code.length < 6 || state !== "success";
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
      <Button className="w-3/4" disabled={disabled}>
        تأكيد
      </Button>
      <div>
        <p className="text-muted-foreground text-sm">
          لم تستلم الكود؟ <Button variant="link">إعادة إرسال الكود</Button>
        </p>
      </div>
    </div>
  );
}
export default SendCode;
