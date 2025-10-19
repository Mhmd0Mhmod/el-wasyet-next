"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { Button } from "../ui/button";
import { OrderByStatus } from "@/types/order";
import { submitActions } from "@/actions/[operations]/action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export interface Operation {
  orderId: number;
  action: string;
  notes: string;
  amount?: number;
  cashAmount?: number;
  creditAmount?: number;
  employeeId?: number;
}
interface OperationsContextType {
  orders: OrderByStatus[];
  operations: Operation[];
  addOperation: (operation: Operation) => void;
  removeOperation: (orderId: number) => void;
  updateOperation: (operation: Operation) => void;
  selectAllOrderIds: (action: string) => void;
  unSelectAllOrderIds: () => void;
}
const OperationsContext = createContext<OperationsContextType | undefined>(
  undefined,
);

function OperationsProvider({
  orders,
  children,
}: {
  orders: OrderByStatus[];
  children: React.ReactNode;
}) {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const updateOperation = useCallback((updatedOperation: Operation) => {
    setOperations((prevOperations) =>
      prevOperations.map((op) =>
        op.orderId === updatedOperation.orderId ? updatedOperation : op,
      ),
    );
  }, []);
  const addOperation = useCallback(
    (operation: Operation) => {
      if (operations.find((op) => op.orderId === operation.orderId)) {
        updateOperation(operation);
        return;
      }
      setOperations((prevOperations) => [...prevOperations, operation]);
    },
    [operations, updateOperation],
  );
  const removeOperation = useCallback((orderId: number) => {
    setOperations((prevOperations) =>
      prevOperations.filter((op) => op.orderId !== orderId),
    );
  }, []);

  const selectAllOrderIds = useCallback(
    (action: string) => {
      const newOperations = orders.map((order) => ({
        orderId: order.orderId,
        action,
        notes: order.notes || "",
      }));
      setOperations(newOperations);
    },
    [orders],
  );
  const unSelectAllOrderIds = useCallback(() => {
    setOperations([]);
  }, []);

  const onSubmit = useCallback(async () => {
    if (operations.length === 0) return;
    setIsSubmitting(true);
    console.log(operations);

    try {
      const result = await submitActions({
        operations,
        pathname,
      });

      if (result.success) {
        toast.success("تم حفظ العمليات بنجاح");
        setOperations([]);
      } else {
        console.log(result.message.toWellFormed());

        toast.error(
          result.message.toWellFormed() || "حدث خطأ أثناء حفظ العمليات",
        );
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [operations, pathname]);

  const onCancel = useCallback(() => {
    setOperations([]);
  }, []);

  return (
    <OperationsContext.Provider
      value={{
        orders,
        operations,
        addOperation,
        removeOperation,
        updateOperation,
        selectAllOrderIds,
        unSelectAllOrderIds,
      }}
    >
      {children}
      {operations.length > 0 && (
        <div className="flex items-center justify-end gap-4">
          <Button onClick={onCancel} variant="outline" disabled={isSubmitting}>
            إلغاء
          </Button>
          <Button
            onClick={onSubmit}
            disabled={operations.length === 0 || isSubmitting}
          >
            {isSubmitting ? "جارٍ الحفظ..." : `حفظ ${operations.length} عمليات`}
          </Button>
        </div>
      )}
    </OperationsContext.Provider>
  );
}

function useOperations() {
  const context = useContext(OperationsContext);
  if (!context) {
    throw new Error("useOperations must be used within an OperationsProvider");
  }
  return context;
}
export { OperationsProvider, useOperations };
