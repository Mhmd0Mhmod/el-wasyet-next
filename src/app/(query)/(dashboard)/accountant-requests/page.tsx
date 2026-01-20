import AccountantRequestsTables from "@/components/(dashboard)/accountant-requests/AccountantRequestsTable";
import AskExpensesTable from "@/components/(dashboard)/accountant-requests/AskExpensesTable";
import FilterSection from "@/components/(dashboard)/dashboard/filter";
import PageLayout from "@/components/Layout/PageLayout";
import AccountantRequestsProvider from "@/components/providers/AccountantRequestsProvider";
import ClearSearchParamsButton from "@/components/shared/ClearSearchParamsButton";
import Pagination from "@/components/shared/Pagination";
import Select from "@/components/shared/Select";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AccountantRequestsAPI,
  AccountantRequestsParams,
  RequestTypes,
} from "@/lib/api/accountant-requests";
import { formatCurrency } from "@/lib/helper";
import { Suspense } from "react";
interface Props {
  searchParams: Promise<AccountantRequestsParams>;
}
async function page({ searchParams }: Props) {
  const [employees, accountants] = await Promise.all([
    AccountantRequestsAPI.getEmployees(),
    AccountantRequestsAPI.getAccountants(),
  ]);
  return (
    <PageLayout
      title="الحسابات"
      description="إداره الحسابات"
      extra={
        <Select
          name="RequestTypeId"
          placeholder="اختر نوع الطلب اولا"
          selectItems={Object.values(RequestTypes).map((type) => ({
            label: type.label,
            value: type.id.toString(),
          }))}
          className="w-48"
        />
      }
    >
      <div className="space-y-4">
        <FilterSection />
        <div className="grid grid-cols-1 justify-items-start gap-4 md:grid-cols-3">
          <Select
            name="employeeid"
            placeholder="الموظف"
            className="w-full"
            selectItems={
              employees.map((emp) => ({
                label: emp.name,
                value: emp.id.toString(),
              })) || []
            }
          />
          <Select
            name="accountantid"
            placeholder="المحاسب"
            className="w-full"
            selectItems={
              accountants.map((acc) => ({
                label: acc.name,
                value: acc.id.toString(),
              })) || []
            }
          />
          <ClearSearchParamsButton className="text-primary bg-primary/10 mr-auto w-1/2 cursor-pointer hover:text-white" />
        </div>
      </div>
      <Suspense fallback={<TableSkeleton columns={9} rows={10} />}>
        <AccountantRequestsTableWrapper searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
async function AccountantRequestsTableWrapper({ searchParams }: Props) {
  const params = await searchParams;
  const data = await AccountantRequestsAPI.fetchAccountantRequests(params);
  const requestTypeId = params.RequestTypeId;
  const itemsData = data.items.at(0);
  const isAskExpenseType =
    requestTypeId === RequestTypes.AskExpense.id.toString();

  return (
    <>
      <AccountantRequestsProvider data={itemsData?.requests || []}>
        {isAskExpenseType ? (
          <AskExpensesTable data={itemsData?.requests || []} />
        ) : (
          <AccountantRequestsTables data={itemsData?.requests || []} />
        )}
      </AccountantRequestsProvider>
      <Pagination
        page={data.pageNumber}
        searchParams={params}
        totalPages={data.totalPages}
      />
      <Card>
        <CardHeader>
          <CardTitle>إحصائيات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 text-lg font-medium">اجمالى ايريدات</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(itemsData?.totalAmount || 0)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 text-lg font-medium">الكاش</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(itemsData?.totalCash || 0)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 text-lg font-medium">كريديت</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(itemsData?.totalCredit || 0)}
              </p>
            </div>
            <div className="col-span-1 flex flex-col rounded-lg bg-gray-100 p-4 md:col-span-3 md:flex-row md:items-center md:justify-between">
              <h3 className="mb-2 text-lg font-medium">صافي الربح</h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(itemsData?.netAmount || 0)}
              </p>
            </div>
            <div className="col-span-1 flex flex-col rounded-lg bg-gray-100 p-4 md:col-span-3 md:flex-row md:items-center md:justify-between">
              <h3 className="mb-2 text-lg font-medium">اجمالى مصروفات</h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(itemsData?.totalExpenses || 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default page;
