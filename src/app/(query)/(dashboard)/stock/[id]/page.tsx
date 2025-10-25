import NewForm from "@/components/(dashboard)/stock/new-form";
import TransferCovenant from "@/components/(dashboard)/stock/transfer-convenant-button";
import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getStockDataById } from "@/data/stock";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle, Edit3, Plus, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

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
  const stockData = await getStockDataById(id);
  if (!stockData) {
    notFound();
  }
  return (
    <PageLayout
      title={stockData.branchName || "المخازن"}
      description="حصر ومتابعة مصروفات المخازن"
      extra={<TransferCovenant />}
    >
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
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="ghost" size="icon">
                    <Edit3 size={16} />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تعديل بيانات الاستماره">
                  <NewForm />
                </Dialog.Content>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      />
    </PageLayout>
  );
}
export default page;
