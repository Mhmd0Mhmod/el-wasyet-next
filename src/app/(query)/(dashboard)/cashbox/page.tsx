import AccountTransactionActions from "@/components/(dashboard)/cashbox/accounts-transaction-actions";
import Table from "@/components/shared/Table";
import PageLayout from "@/components/Layout/PageLayout";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCashboxData } from "@/data/cashbox";
import { formatCurrency, formatDate } from "@/lib/helper";
import { CashboxDetails } from "@/types/cashbox";
import Link from "next/link";
import { checkAccess, getCurrentUser } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";

async function page() {
  const canView = await checkAccess(ABILITY_IDS.VIEW_CASH_BOX);

  if (!canView) {
    return (
      <PageLayout title="الخزنه" description="تحليل وإدارة عمليات الخزنة">
        <div className="text-center text-gray-500">
          ليس لديك صلاحية لعرض هذه الصفحة
        </div>
      </PageLayout>
    );
  }

  const cashboxData = await getCashboxData();
  const user = await getCurrentUser();
  // const isAccountant = user.roles;
  return (
    <PageLayout title="الخزنه" description="تحليل وإدارة عمليات الخزنة">
      <FinincialReports data={cashboxData} />
      <TransactionsTable data={cashboxData} />
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full sm:w-auto">طلب تحويل للحسابات</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="sm:text-right">
              <AlertDialogTitle>
                هل أنت متأكد من تنفيذ طلب التحويل؟
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AccountTransactionActions />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
}
function FinincialReports({ data }: { data: CashboxDetails }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div className="space-y-2">
        <Label>رصيد كاش</Label>
        <Input
          className="bg-gray-200"
          disabled
          value={formatCurrency(data.cashBalance)}
        />
      </div>
      <div className="space-y-2">
        <Label>رصيد كريديت</Label>
        <Input
          className="bg-gray-200"
          disabled
          value={formatCurrency(data.creditBalance)}
        />
      </div>
      <div className="space-y-2">
        <Label>المجموع</Label>
        <Input
          className="bg-gray-200"
          disabled
          value={formatCurrency(data.totalBalance)}
        />
      </div>
    </div>
  );
}
const COLUMNS = [
  { label: "كود العمليه ", id: "id" },
  { label: "تاريخ العمليه", id: "date" },
  { label: "الخدمه", id: "serviceName" },
  { label: "نوع العمليه", id: "transactionType" },
  { label: "رقم العمليه", id: "transactionId" },
  { label: "المجموع", id: "amount" },
];
function TransactionsTable({ data }: { data: CashboxDetails }) {
  return (
    <Table
      columns={COLUMNS}
      renderData={data.transactionList.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{formatDate(item.transactionDate, "datetime")}</TableCell>
          <TableCell>{item.servicetype}</TableCell>
          <TableCell>{item.type}</TableCell>
          <TableCell>
            <Button variant="link" className="p-0" asChild>
              <Link href={`/orders/${item.orderID}`}>{item.orderID}</Link>
            </Button>
          </TableCell>
          <TableCell>{formatCurrency(item.totalAmount)}</TableCell>
        </TableRow>
      ))}
    />
  );
}
export default page;
