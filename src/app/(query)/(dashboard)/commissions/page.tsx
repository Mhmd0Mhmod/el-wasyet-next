import CommissionForm from "@/components/(dashboard)/commissions/commission-form";
import DeleteCommissionsAction from "@/components/(dashboard)/commissions/delete-commision-button";
import Dialog from "@/components/shared/Dialog";
import Table from "@/components/shared/Table";
import PageLayout from "@/components/Layout/PageLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCommissions } from "@/data/commissions";
import { formatCount } from "@/lib/helper";
import { Edit3Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { Suspense } from "react";
import TableSkeleton from "@/components/shared/TableSkeleton";
import ExportButton from "@/components/shared/export-button";

function page() {
  return (
    <PageLayout
      title="العمولات"
      description="تسجيل ومتابعة والعمولات"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button>
              <PlusIcon />
              إضافه عموله جديده
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافه عموله جديده">
            <CommissionForm />
          </Dialog.Content>
        </Dialog>
      }
    >
      <div className="flex justify-end">
        <ExportButton url="Commission/export/roles" />
      </div>
      <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
        <CommissionsTable />
      </Suspense>
    </PageLayout>
  );
}
const COLUMNS = [
  {
    label: "المسمي الوظيفي",
    id: "roleName",
  },
  {
    label: "نسبه العموله",
    id: "commissionPercentage",
  },
  {
    label: "العمليات",
    id: "actions",
  },
];
async function CommissionsTable() {
  const commissions = await getCommissions();
  return (
    <>
      <Table
        columns={COLUMNS}
        renderData={commissions.map((commission) => (
          <TableRow key={commission.id}>
            <TableCell>{commission.roleName}</TableCell>
            <TableCell>
              % {formatCount(commission.commissionPercentage)}
            </TableCell>
            <TableCell>
              <Dialog>
                <Dialog.Trigger>
                  <Button variant={"link"} className="text-gray-500">
                    <Edit3Icon size={14} />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تعديل نسبه العموله">
                  <CommissionForm commission={commission} />
                </Dialog.Content>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"link"} className="text-red-500">
                    <Trash2Icon size={14} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="sm:text-right">
                      هل انت متأكد من حذف نسبه العموله لهذا المسمي
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <DeleteCommissionsAction roleId={commission.roleId} />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}
export default page;
