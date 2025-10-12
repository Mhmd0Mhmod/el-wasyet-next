"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { Button } from "../ui/button";

interface Operation {
  orderId: number;
  action: string;
  notes: string;
  amount: number;
  cashAmount: number;
  creditAmount: number;
  employeeId: number;
}
interface OperationsContextType {
  operations: Operation[];
  addOperation: (operation: Operation) => void;
  removeOperation: (orderId: number) => void;
  updateOperation: (operation: Operation) => void;
}
const OperationsContext = createContext<OperationsContextType | undefined>(
  undefined,
);

function OperationsProvider({ children }: { children: React.ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>([]);
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
  const onSubmit = useCallback(() => {
    // Handle submission logic here
    console.log("Submitting operations:", operations);
  }, [operations]);
  const onCancel = useCallback(() => {
    setOperations([]);
  }, []);

  return (
    <OperationsContext.Provider
      value={{ addOperation, removeOperation, updateOperation, operations }}
    >
      {children}
      {operations.length > 0 && (
        <div className="flex items-center justify-end-safe gap-4">
          <Button onClick={onCancel} variant={"outline"}>
            إالغاء
          </Button>
          <Button onClick={onSubmit} disabled={operations.length === 0}>
            حفظ العمليات
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
