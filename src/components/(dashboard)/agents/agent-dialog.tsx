"use client";

import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import useAgent from "@/hooks/use-agent";
import { formatCount, formatDate } from "@/lib/helper";
import { useCallback, useState } from "react";
const COLUMNS = [
  {
    label: "اسم الوكيل",
    id: "name",
  },
  {
    label: "كود الاوردر",
    id: "orderCode",
  },
  {
    label: "التاريخ",
    id: "date",
  },
  {
    label: "نسبه العموله",
    id: "commissionPercentage",
  },
];
function AgentDialog({ agentId }: { agentId: number }) {
  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const { data, isLoading } = useAgent(
    agentId,
    filters.startDate,
    filters.endDate,
  );

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    setFilters({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }, []);
  return (
    <div className="space-y-5 overflow-auto">
      <form
        className="grid w-full grid-cols-1 place-items-center-safe gap-4 sm:grid-cols-3"
        onSubmit={onFormSubmit}
      >
        <div className="space-y-3">
          <Label htmlFor="startDate">تاريخ البدء</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={filters.startDate || ""}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="endDate">تاريخ الانتهاء</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={filters.endDate || ""}
          />
        </div>
        <div className="self-end-safe">
          <Button type="submit">بحث</Button>
        </div>
      </form>
      {isLoading && <TableSkeleton />}
      {!isLoading && data && (
        <Table
          columns={COLUMNS}
          renderData={data.transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.agentName}</TableCell>
              <TableCell>{transaction.orderCode}</TableCell>
              <TableCell>
                {formatDate(transaction.transactionDate, "datetime")}
              </TableCell>
              <TableCell>
                % {formatCount(transaction.commissionAmount)}
              </TableCell>
            </TableRow>
          ))}
        />
      )}
    </div>
  );
}
export default AgentDialog;
