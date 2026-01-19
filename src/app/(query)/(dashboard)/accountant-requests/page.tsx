import FilterSection from "@/components/(dashboard)/dashboard/filter";
import PageLayout from "@/components/Layout/PageLayout";
import AccountRequestActions from "@/components/main/accountant-requests/AccountRequestActions";
import SelectAll from "@/components/main/accountant-requests/SelectAll";
import AccountantRequestsProvider from "@/components/providers/AccountantRequestsProvider";
import ClearSearchParamsButton from "@/components/shared/ClearSearchParamsButton";
import Pagination from "@/components/shared/Pagination";
import Select from "@/components/shared/Select";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import { ACCOUNTANT_REQUESTS_COLUMNS } from "@/constants/Columns";
import {
  AccountantRequestsAPI,
  AccountantRequestsParams,
  RequestType,
} from "@/lib/api/accountant-requests";
import { formatCurrency, formatDate } from "@/lib/helper";
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
    <PageLayout title="الحسابات" description="إداره الحسابات">
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

  const itemsData = data.items.at(0);
  const rowsColors = {
    Pending: "bg-yellow-100",
    Approved: "bg-green-100",
    Rejected: "bg-red-100",
  };
  return (
    <>
      <AccountantRequestsProvider data={itemsData?.requests || []}>
        <Table
          selectAllComponent={SelectAll}
          columns={ACCOUNTANT_REQUESTS_COLUMNS}
          renderData={
            <>
              {data.items.at(0)?.requests.map((request) => (
                <TableRow
                  key={request.requestId}
                  className={
                    rowsColors[
                      request.requestStatusName as keyof typeof rowsColors
                    ]
                  }
                >
                  <TableCell>
                    <AccountRequestActions
                      disabled={request.requestStatusName !== "Pending"}
                      requestId={request.requestId}
                    />
                  </TableCell>
                  <TableCell>
                    <RequestStatus status={request.requestStatusName} />
                  </TableCell>
                  <TableCell>{formatCurrency(request.amountInCash)}</TableCell>
                  <TableCell>
                    {formatCurrency(request.amountInCredit)}
                  </TableCell>
                  <TableCell>{formatCurrency(request.amount)}</TableCell>
                  <TableCell>{request.toEmployeeName}</TableCell>
                  <TableCell>{request.fromEmployeeName}</TableCell>
                  <TableCell>{RequestType[request.requestTypeName]}</TableCell>
                  <TableCell>
                    {formatDate(request.requestDate, "datetime")}
                  </TableCell>
                </TableRow>
              ))}
            </>
          }
        />
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

function RequestStatus({ status }: { status: string }) {
  const translatedStatus = {
    Pending: "قيد الانتظار",
    Approved: "تمت الموافقة",
    Rejected: "تم الرفض",
  };

  return (
    <span>
      {translatedStatus[status as keyof typeof translatedStatus] || status}
    </span>
  );
}
export default page;
