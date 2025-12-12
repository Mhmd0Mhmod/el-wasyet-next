import { checkAccess } from "@/actions/auth/actions";
import DialogNewFormWrapper from "@/components/(dashboard)/stock/DialogNewFormWrapper";
import NewForm from "@/components/(dashboard)/stock/new-form";
import TransferCovenant from "@/components/(dashboard)/stock/transfer-convenant-button";
import PageLayout from "@/components/Layout/PageLayout";
import Dialog from "@/components/shared/Dialog";
import Table from "@/components/shared/Table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ABILITY_IDS } from "@/constants/abilities";
import { getStockDataById } from "@/data/stock";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle, Plus, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}
const COLUMNS = [
  {
    label: "كود الاستماره",
    id: "formCode",
  },
  { label: "اسم الاستماره", id: "formName" },
  {
    label: "العدد",
    id: "quantity",
  },
  {
    label: "حاله الاستماره",
    id: "formStatus",
  },
  {
    label: "العمليات",
    id: "actions",
  },
];
function getFormStatus(isLowStock: boolean, quantity: number) {
  if (isLowStock && quantity > 0) {
    return (
      <div className={cn("flex items-center gap-1 text-yellow-500")}>
        <Bell size={16} />
        <span>قريب من النفاذ</span>
      </div>
    );
  }
  if (quantity === 0) {
    return (
      <div className={cn("flex items-center gap-1 text-red-500")}>
        <XCircle size={16} />
        <span>نفذ</span>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-1 text-green-500")}>
      <CheckCircle size={16} />
      <span>متوفر</span>
    </div>
  );
}
async function page({ params }: PageProps) {
  const { id } = await params;
  const canViewStock = await checkAccess(ABILITY_IDS.VIEW_CUSTODY);
  const canAddANDEDIT = await checkAccess(ABILITY_IDS.MANAGE_CUSTODY);
  const stockData = await getStockDataById(id);
  if (!stockData) {
    notFound();
  }

  return (
    <PageLayout
      title={stockData.branchName || "المخازن"}
      description="حصر ومتابعة مصروفات المخازن"
      extra={canViewStock && <TransferCovenant />}
    >
      {canAddANDEDIT && (
        <div className="flex justify-end">
          <Dialog>
            <Dialog.Trigger>
              <Button>
                <Plus size={16} className="ml-1" />
                اضافة استماره جديده
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="إضافة استماره جديده">
              <NewForm />
            </Dialog.Content>
          </Dialog>
        </div>
      )}
      {stockData.withWho && (
        <div className="flex justify-end">
          <Alert className="w-fit" variant={"default"}>
            <AlertTitle>
              مالك العهده الحالي هو :
              <span className="mr-1 font-semibold"> {stockData.withWho}</span>
            </AlertTitle>
          </Alert>
        </div>
      )}
      {canViewStock && (
        <Table
          columns={COLUMNS}
          renderData={stockData.forms.map((form, index) => (
            <TableRow key={`${form.formId}-${index}`}>
              <TableCell>{form.formId}</TableCell>
              <TableCell>{form.formName}</TableCell>
              <TableCell>{form.quantity}</TableCell>
              <TableCell>
                {getFormStatus(form.isLowStock, form.quantity)}
              </TableCell>
              <TableCell>
                {canAddANDEDIT && (
                  <DialogNewFormWrapper
                    form={form}
                    branchId={stockData.branchId}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        />
      )}
    </PageLayout>
  );
}
export default page;
