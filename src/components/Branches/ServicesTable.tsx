import { Button } from "@/components/ui/button";

import { ServicesTableHeaders } from "@/data/branch-services";
import { Service } from "@/types/service";
import { Edit2, Eye } from "lucide-react";
import Table from "../general/Table";
import { TableCell, TableRow } from "../ui/table";
import Dialog from "../general/Dialog";
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
            {Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "EGP",
            }).format(service.bankFees)}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="ghost" size="sm" aria-label="عرض">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تفاصيل الخدمة">
                  <ServicesTabs services={service} />
                </Dialog.Content>
              </Dialog>
              <Button variant="ghost" size="sm" aria-label="تعديل">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    />
  );
}
export default ServicesTable;
