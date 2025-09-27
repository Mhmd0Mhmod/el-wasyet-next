import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import { Service } from "@/types/service";
import { CheckCircle, FileText, XCircle } from "lucide-react";
import Table from "../general/Table";
import { TableCell, TableRow } from "../ui/table";

function ServiceDetails({ service }: { service?: Service }) {
  if (!service) {
    return (
      <div className="p-6 text-center text-gray-500">
        لم يتم العثور على تفاصيل الخدمة
      </div>
    );
  }
  const overheadFees = service.overheads.reduce((sum, overhead) => {
    return sum + overhead.value;
  }, 0);
  const totalFees = service.defaultFees + service.bankFees + overheadFees;

  return (
    <div className="max-h-[80vh] space-y-6 overflow-y-auto" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{service.name}</h1>
        {service.suspended && <Badge variant="destructive">الخدمة معلقة</Badge>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Service Fees */}
        <Card className="bg-green-100">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">
              الرسوم المالية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">الرسوم الأساسية:</span>
              <span>{formatCurrency(service.defaultFees)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">رسوم إضافية:</span>
              <span>{formatCurrency(overheadFees)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">رسوم بنكية:</span>
              <span>{formatCurrency(service.bankFees)}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-sm text-gray-500">إجمالي الرسوم:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(totalFees)}
              </span>
            </div>
          </CardContent>
        </Card>
        {/* Service Information */}
        <Card className="bg-purple-100">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">
              تفاصيل الخدمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">مدة التنفيذ:</span>
              <span>{service.validityPeriodDays} يوم</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">عدد المستندات:</span>
              <span>{service.documents.length} مستند</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">مده تحديد الخدمه:</span>
              <span>{service.expiryPeriodYears} سنة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">شهادة:</span>
              {service.isCertificate ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Required Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            المستندات المطلوبة للخدمة
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="ga grid grid-cols-1 md:grid-cols-2">
            {service.documents.map((document) => (
              <div key={document.id} className="flex items-center gap-2">
                <FileText
                  className="text-primary h-5 w-5"
                  id={`doc-${document.id}`}
                />
                <span className="text-sm font-medium">
                  {document.description}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">مراحل تنفيذ الخدمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {service.workflows
              .sort((a, b) => a.sequence - b.sequence)
              .map((workflow) => (
                <div key={workflow.id} className="flex items-center gap-2">
                  <Badge variant="outline">{workflow.sequence}</Badge>{" "}
                  <span className="text-sm">{workflow.orderStatusName}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Overheads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">
            الرسوم الإضافية والعلاوات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table
            columns={[
              { label: "الغرامه", id: "penalty" },
              { label: "قيمه الرسوم", id: "value" },
              { label: "النوع", id: "description" },
            ]}
            renderData={service.overheads.map((overhead) => (
              <TableRow key={overhead.id}>
                <TableCell>{overhead.description}</TableCell>
                <TableCell>{formatCurrency(overhead.value)}</TableCell>
                <TableCell>
                  {overhead.penalty
                    ? "غرامة"
                    : overhead.forms
                      ? "مستندات"
                      : overhead.adminFees
                        ? " رسوم إدارية"
                        : "نوع غير معروف"}
                </TableCell>
              </TableRow>
            ))}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceDetails;
