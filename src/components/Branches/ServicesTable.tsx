import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SERVICES_DATA,
  ServicesTableHeaders,
} from "@/lib/data/branch-services";
import { Edit2, Eye } from "lucide-react";

function ServicesTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {ServicesTableHeaders.map((header) => (
              <TableHead key={header.id} className="text-right">
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {SERVICES_DATA.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">
                {service.serviceName}
              </TableCell>
              <TableCell>{service.fee}</TableCell>
              <TableCell>
                <Button variant="link" className="text-blue-600 p-0 h-auto">
                  {service.documents}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="link" className="text-blue-600 p-0 h-auto">
                  {service.serviceSteps}
                </Button>
              </TableCell>
              <TableCell>{service.additionalFees}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" aria-label="تعديل">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="عرض">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default ServicesTable;
