"use client";
import { useAgents } from "@/hooks/useAgents";
import { useOffers } from "@/hooks/useOffers";
import { convertOverheadLabel, formatCurrency } from "@/lib/helper";
import { handleNumberKeyPress } from "@/lib/utils";
import AddOverheadForm from "../general/AddOverheadForm";
import Table from "../general/Table";
import TableSkeleton from "../general/TableSkeleton";
import { useOrderForm, useOrderService } from "../providers/OrderFormProvider";
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
  const form = useOrderForm();
  const { offers } = useOffers();
  const { agents } = useAgents();

  if (!service) return null;
  if (isLoading) return <TableSkeleton columns={3} rows={4} />;

  const { watch } = form;
  const { overheads } = service;
  const selectedOverheads = watch("OverheadIds") || [];

  function onOverheadChange(overheadId: number, checked: boolean) {
    const currentOverheads = watch("OverheadIds") || [];
    if (checked) {
      form.setValue("OverheadIds", [...currentOverheads, overheadId]);
    } else {
      form.setValue(
        "OverheadIds",
        currentOverheads.filter((id: number) => id !== overheadId),
      );
    }
  }

  const selectedOverheadsValue = overheads
    .filter((overhead) => selectedOverheads.includes(overhead.id))
    .reduce((acc, curr) => acc + curr.value, 0);
  const customOverheadsValue = watch("CustomOverheads")?.reduce(
    (acc, curr) => acc + (curr.value || 0),
    0,
  );
  const offerPercentage = offers?.find(
    (o) => o.offerId === watch("OfferId"),
  )?.discountPercentage;
  const agentPercentage = agents?.find(
    (a) => a.id === watch("AgentId"),
  )?.commissionPercentage;

  const baseAmount =
    service.defaultFees + selectedOverheadsValue + (customOverheadsValue || 0);
  const offerDiscount = (service.defaultFees * (offerPercentage || 0)) / 100;
  const agentCommission = (service.defaultFees * (agentPercentage || 0)) / 100;

  const totalAmount = baseAmount - offerDiscount + agentCommission;

  return (
    <div className="space-y-4" dir="rtl">
      <h4 className="text-lg font-semibold">الرسوم الإضافية</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="Amount">إجمالي قيمة الطلب</Label>
          <div className="relative">
            <Input
              type="text"
              value={totalAmount.toFixed(2)}
              disabled
              readOnly
              {...form.register("Amount")}
            />
            <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
              ج.م
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ServiceFees">رسوم الخدمة</Label>
          <div className="relative">
            <Input
              type="text"
              value={service.defaultFees.toString()}
              disabled
              readOnly
              {...form.register("ServiceFees")}
            />
            <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
              ج.م
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Cash">المجموع كاش</Label>
          <div className="relative">
            <Input
              type="number"
              {...form.register("Cash", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              onKeyPress={handleNumberKeyPress}
            />
            <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
              ج.م
            </span>
          </div>
          {form.formState.errors.Cash && (
            <p className="text-sm text-red-600">
              {form.formState.errors.Cash.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Credit">المجموع كارديت</Label>
          <div className="relative">
            <Input
              type="number"
              {...form.register("Credit", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              onKeyPress={handleNumberKeyPress}
            />
            <span className="absolute top-1/2 left-10 -translate-y-1/2 transform text-sm text-gray-500">
              ج.م
            </span>
          </div>
          {form.formState.errors.Credit && (
            <p className="text-sm text-red-600">
              {form.formState.errors.Credit.message}
            </p>
          )}
        </div>
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
