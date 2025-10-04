"use client";
import { convertOverheadLabel, formatCurrency } from "@/lib/helper";
import AddOverheadForm from "../general/AddOverheadForm";
import Table from "../general/Table";
import TableSkeleton from "../general/TableSkeleton";
import { useOrderForm } from "../providers/OrderFormProvider";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TableCell, TableRow } from "../ui/table";
import { useCallback, useEffect } from "react";
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
  const { service, isLoadingService, totalAmount, form } = useOrderForm();

  const { watch } = form;
  const onOverheadChange = useCallback(
    function (overheadId: number, checked: boolean) {
      const currentOverheads = watch("OverheadIds") || [];
      if (checked) {
        form.setValue("OverheadIds", [...currentOverheads, overheadId]);
      } else {
        form.setValue(
          "OverheadIds",
          currentOverheads.filter((id: number) => id !== overheadId),
        );
      }
    },
    [form, watch],
  );
  useEffect(() => {
    if (!service) return;
    form.setValue("Amount", totalAmount);
    form.setValue("ServiceFees", service.defaultFees);
  }, [service, form, totalAmount]);
  if (!service) return null;
  if (isLoadingService) return <TableSkeleton columns={3} rows={4} />;
  const { overheads } = service;
  const selectedOverheads = watch("OverheadIds") || [];

  return (
    <div className="space-y-4" dir="rtl">
      <h4 className="text-lg font-semibold">الرسوم الإضافية</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="Amount"
          defaultValue={totalAmount}
          render={({ field }) => (
            <FormItem>
              <FormLabel>المجموع الكلي للخدمة</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="text" {...field} disabled value={totalAmount} />
                  <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
                    ج.م
                  </span>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ServiceFees"
          defaultValue={service.defaultFees}
          render={({ field }) => (
            <FormItem>
              <FormLabel>رسوم الخدمة</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    disabled
                    value={service.defaultFees}
                  />
                  <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
                    ج.م
                  </span>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Cash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المجموع كاش</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : Number(value));
                    }}
                  />
                  <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
                    ج.م
                  </span>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Credit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المجموع كارديت</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : Number(value));
                    }}
                  />
                  <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
                    ج.م
                  </span>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Table
        columns={columns}
        renderData={overheads.map((overhead) => {
          const checked = selectedOverheads.includes(overhead.id);
          return (
            <TableRow key={overhead.id}>
              <TableCell>
                <div className="flex items-center gap-4 ps-2">
                  <Checkbox
                    onCheckedChange={() =>
                      onOverheadChange(overhead.id, !checked)
                    }
                  />
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
          );
        })}
      />
      <AddOverheadForm
        name="CustomOverheads"
        title="التكاليف الإضافية المخصصة"
      />
    </div>
  );
}

export default OverheadsForms;
