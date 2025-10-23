"use client";
import { deleteAgent } from "@/actions/agents/actions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

function DeleteAgentButton({ agentId }: { agentId: number }) {
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  function handleDelete() {
    setState("pending");
    const id = toast.loading("جاري الحذف...");
    deleteAgent(agentId)
      .then((response) => {
        if (response.success) {
          setState("success");
          toast.success("تم الحذف بنجاح", { id });
        } else {
          setState("error");
          toast.error(`حدث خطأ: ${response.message}`, { id });
        }
      })
      .catch((error) => {
        setState("error");
        toast.error(`حدث خطأ: ${error.message}`, { id });
      });
  }
  const isPending = state === "pending";
  return (
    <AlertDialogAction
      type="submit"
      disabled={isPending}
      onClick={handleDelete}
    >
      حذف
    </AlertDialogAction>
  );
}
export default DeleteAgentButton;
