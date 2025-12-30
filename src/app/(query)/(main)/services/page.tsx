import Dialog from "@/components/shared/Dialog";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ServiceDetails from "@/components/main/services/ServiceDetails";
import ServiceForm from "@/components/main/services/ServiceForm";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ServicesTableHeaders } from "@/data/branch-services";
import { getServices, getWorkFlows } from "@/data/services";
import { formatCurrency } from "@/lib/helper";
import { Edit2, Eye, Lock, LockIcon, Plus, UnlockIcon } from "lucide-react";
import { Suspense } from "react";
import ExportButton from "@/components/shared/export-button";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ToggleServiceStatusAction from "@/components/main/services/ToggleServiceStatusAction";

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
  const canEdit = await checkAccess(ABILITY_IDS.UPDATE_SERVICE);

  const data = await getServices(searchParams);
  const workFlows = await getWorkFlows();
  return (
    <>
      <Table
        columns={serviceColumns}
        renderData={data?.items.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{formatCurrency(service.defaultFees)}</TableCell>
            <TableCell>{service.documents.length} مستندات</TableCell>
            <TableCell>{service.workflows.length} خطوات</TableCell>
            <TableCell>
              {formatCurrency(
                service?.overheads?.reduce((acc, curr) => acc + curr.value, 0),
              )}
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
              {canEdit && (
                <>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {service.suspended ? (
                          <LockIcon size={20} />
                        ) : (
                          <UnlockIcon size={20} />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="sm:text-right">
                        <AlertDialogTitle>
                          {service.suspended
                            ? "هل أنت متأكد من تفعيل هذه الخدمة؟"
                            : "هل أنت متأكد من إيقاف هذه الخدمة؟"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          هذا الإجراء سيؤثر على توافر الخدمة في جميع الفروع. هل
                          أنت متأكد من المتابعة؟
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <ToggleServiceStatusAction
                          serviceId={service.id}
                          suspended={service.suspended}
                        >
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
                            {service.suspended ? <UnlockIcon /> : <Lock />}
                            {service.suspended
                              ? "تفعيل الخدمة"
                              : "إيقاف الخدمة"}
                          </AlertDialogAction>
                        </ToggleServiceStatusAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        page={data.pageNumber}
        totalPages={data.totalPages}
        searchParams={searchParams}
      />
    </>
  );
}
async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const canCreate = await checkAccess(ABILITY_IDS.CREATE_SERVICE);
  const workFlows = await getWorkFlows();

  return (
    <PageLayout
      title="الخدمات"
      description="إدارة جميع الخدمات المتاحة في الفروع"
      extra={
        canCreate && (
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
        )
      }
    >
      <div className="mb-4 flex flex-wrap justify-between gap-4 sm:items-center">
        <SearchInput title="ابحث عن خدمة" />
        <div className="mr-auto">
          <ExportButton url="/Service/export-to-excel" params={params} />
        </div>
      </div>
      <>
        <Suspense
          fallback={<TableSkeleton rows={5} columns={5} />}
          key={JSON.stringify(params)}
        >
          <ServicesTable searchParams={params} />
        </Suspense>
      </>
    </PageLayout>
  );
}
export default page;
