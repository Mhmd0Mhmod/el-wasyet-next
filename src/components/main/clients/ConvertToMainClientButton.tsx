"use client";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useCallback } from "react";

function ConvertToMainClientButton({ clientId }: { clientId: number }) {
  const onClick = useCallback(() => {
    // Implement the conversion logic here
    console.log(`Converting client with ID ${clientId} to main client.`);
  }, [clientId]);
  return (
    <Button variant="destructive" onClick={onClick}>
      <Users className="ml-2" />
      تحويل إلى عميل رئيسي
    </Button>
  );
}
export default ConvertToMainClientButton;
