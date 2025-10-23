"use client";
import {
  createAgent as createAgentServer,
  updateAgent as updateAgentServer,
} from "@/actions/agents/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Agent } from "@/types/order";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
function AgentForm({ agent }: { agent?: Agent }) {
  const form = useForm<Partial<Agent>>({
    defaultValues: agent || {
      name: "",
      commissionPercentage: 0,
      isActive: true,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateAgent = useCallback(
    async (data: Partial<Agent>) => {
      if (!agent) return;
      const id = toast.loading("جاري الحفظ...");
      setIsSubmitting(true);
      try {
        await updateAgentServer(agent.id, data);
        toast.success("تم تحديث الوكيل بنجاح", { id });
      } catch (error) {
        toast.error("فشل تحديث الوكيل", { id });
      } finally {
        setIsSubmitting(false);
      }
    },
    [agent],
  );
  const createAgent = useCallback(async (data: Partial<Agent>) => {
    const id = toast.loading("جاري الحفظ...");
    setIsSubmitting(true);
    try {
      await createAgentServer(data);
      toast.success("تم إنشاء الوكيل بنجاح", { id });
    } catch (error) {
      toast.error("فشل إنشاء الوكيل", { id });
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  const onSubmit = useCallback(
    (data: Partial<Agent>) => {
      if (agent) {
        updateAgent(data);
      } else {
        createAgent(data);
      }
    },
    [agent, updateAgent, createAgent],
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-2 items-center gap-4"
    >
      <div className="space-y-4">
        <Label htmlFor="name">اسم الوكيل</Label>
        <Input {...form.register("name")} id="name" />
      </div>
      <div className="space-y-4">
        <Label htmlFor="commissionPercentage">نسبة العمولة</Label>
        <Input
          {...form.register("commissionPercentage")}
          id="commissionPercentage"
          type="number"
        />
      </div>
      <div className="col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          حفظ
        </Button>
      </div>
    </form>
  );
}
export default AgentForm;
