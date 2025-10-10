import Dialog from "@/components/general/Dialog";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServiceForm from "@/components/services/ServiceForm";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ServicesTableHeaders } from "@/data/branch-services";
import { getServices, getWorkFlows } from "@/data/services";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";

const serviceColumns = [
  ...ServicesTableHeaders.slice(0, -1),
  {
    label: "معياد التسليم",
    id: "deliveryDate",
  },
  { label: "ميعاد التجديد", id: "renewalDate" },
  { id: "actions", label: "العمليات" },
];
async function ServicesTable({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const data = await getServices(searchParams);
  const workFlows = await getWorkFlows();

  return (
    <>
      <Table
        columns={serviceColumns}
        renderData={data?.items.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>
              {Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
              }).format(service.defaultFees)}
            </TableCell>
            <TableCell>{service.documents.length} مستندات</TableCell>
            <TableCell>{service.workflows.length} خطوات</TableCell>
            <TableCell>
              {Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
              }).format(service.bankFees)}
            </TableCell>
            <TableCell>{service.validityPeriodDays} ايام</TableCell>
            <TableCell>{service.expiryPeriodYears} سنوات</TableCell>
            <TableCell className="flex gap-2 text-gray-500">
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="ghost" size="sm">
                    <Eye size={20} />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تفاصيل الخدمة" className="sm:max-w-2xl">
                  <ServiceDetails service={service} />
                </Dialog.Content>
              </Dialog>
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="ghost" size="sm">
                    <Edit2 size={20} />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تعديل الخدمة">
                  <ServiceForm service={service} workFlows={workFlows} />
                </Dialog.Content>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const { search, page } = await searchParams;
  const workFlows = await getWorkFlows();

  return (
    <PageLayout
      title="الخدمات"
      description="إدارة جميع الخدمات المتاحة في الفروع"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button>
              <Plus />
              إضافة خدمة
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافة خدمة جديدة" className="sm:max-w-xl">
            <ServiceForm workFlows={workFlows} />
          </Dialog.Content>
        </Dialog>
      }
    >
      <SearchInput title="ابحث عن خدمة" />
      <>
        <Suspense
          fallback={<TableSkeleton rows={5} columns={5} />}
          key={search + (page || "")}
        >
          <ServicesTable searchParams={{ search, page }} />
        </Suspense>
      </>
    </PageLayout>
  );
}
export default page;
