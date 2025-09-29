"use client";

import { convertOverheadLabel, formatCurrency } from "@/lib/helper";
import { useFormContext } from "react-hook-form";
import AddOverheadForm from "../general/AddOverheadForm";
import Table from "../general/Table";
import TableSkeleton from "../general/TableSkeleton";
import {
  OrderFormField,
  useOrderService,
} from "../providers/OrderFormProvider";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TableCell, TableRow } from "../ui/table";
const columns = [
  {
    id: "overhead",
    label: "الغرامة",
  },
  {
    id: "value",
    label: "قيمة الرسوم",
  },
  {
    id: "type",
    label: "النوع",
  },
];

function OverheadsForms() {
  const { service, isLoading } = useOrderService();
  const form = useFormContext();
  if (!service) return null;
  if (isLoading) return <TableSkeleton columns={3} rows={4} />;
  const { overheads } = service;

  return (
    <div className="space-y-4" dir="rtl">
      <h4 className="text-lg font-semibold">الرسوم الإضافية</h4>

      {/* Header Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OrderFormField
          name="Amount"
          label="إجمالي قيمة الطلب"
          render={({ field }) => (
            <div className="relative">
              <Input
                type="text"
                value={(field.value as number) || ""}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className="pl-12"
                placeholder="200"
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-gray-500">
                ج.م
              </span>
            </div>
          )}
        />

        <OrderFormField
          name="ServiceFees"
          label="رسوم المحدة"
          render={({ field }) => (
            <div className="relative">
              <Input
                type="text"
                value={(field.value as number) || ""}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className="pl-12"
                placeholder="200"
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-gray-500">
                ج.م
              </span>
            </div>
          )}
        />

        <OrderFormField
          name="Credit"
          label="المجموع كارديت"
          render={({ field }) => (
            <div className="relative">
              <Input
                type="text"
                value={(field.value as number) || ""}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className="pl-12"
                placeholder="00.00"
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-gray-500">
                ج.م
              </span>
            </div>
          )}
        />
      </div>
      <Table
        columns={columns}
        renderData={overheads.map((overhead) => (
          <TableRow key={overhead.id}>
            <TableCell>
              <div className="flex items-center gap-4 ps-2">
                <Checkbox />
                <Label>{overhead.description}</Label>
              </div>
            </TableCell>
            <TableCell>{formatCurrency(overhead.value)}</TableCell>
            <TableCell>
              <Badge variant={"outline"}>
                {convertOverheadLabel(overhead)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      />
      <AddOverheadForm form={form} name="CustomOverheads" />
    </div>
  );
}

export default OverheadsForms;
