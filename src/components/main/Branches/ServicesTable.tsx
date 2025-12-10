import { Button } from "@/components/ui/button";

import Dialog from "@/components/shared/Dialog";
import Table from "@/components/shared/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import { ServicesTableHeaders } from "@/data/branch-services";
import { formatCurrency } from "@/lib/helper";
import { Service } from "@/types/service";
import { Eye } from "lucide-react";
import ServicesTabs from "./ServicesTabs";

function ServicesTable({ services }: { services: Service[] }) {
  return (
    <Table
      columns={ServicesTableHeaders}
      renderData={services.map((service) => (
        <TableRow key={service.id}>
          <TableCell className="font-medium">{service.name}</TableCell>
          <TableCell>
            {Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "EGP",
            }).format(service.defaultFees)}
          </TableCell>
          <TableCell className="underline">
            مستندات ({service.documents.length})
          </TableCell>
          <TableCell className="underline">
            خطوات ({service.workflows.length})
          </TableCell>
          <TableCell>
            {formatCurrency(
              service.overheads.reduce((acc, curr) => acc + curr.value, 0),
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="ghost" size="sm" aria-label="عرض">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تفاصيل الخدمة" className="min-w-fit">
                  <ServicesTabs services={service} />
                </Dialog.Content>
              </Dialog>
            </div>
          </TableCell>
        </TableRow>
      ))}
    />
  );
}
export default ServicesTable;
