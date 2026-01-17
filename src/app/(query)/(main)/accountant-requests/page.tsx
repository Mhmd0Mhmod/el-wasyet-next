import FilterSection from "@/components/(dashboard)/dashboard/filter";
import PageLayout from "@/components/Layout/PageLayout";
import AccountRequestActions from "@/components/main/accountant-requests/AccountRequestActions";
import SelectAll from "@/components/main/accountant-requests/SelectAll";
import AccountantRequestsProvider from "@/components/providers/AccountantRequestsProvider";
import Pagination from "@/components/shared/Pagination";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
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
function page({ searchParams }: Props) {
  return (
    <PageLayout title="الحسابات" description="إداره الحسابات">
      <FilterSection />
      <Suspense fallback={<TableSkeleton columns={9} rows={10} />}>
        <AccountantRequestsTableWrapper searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
async function AccountantRequestsTableWrapper({ searchParams }: Props) {
  const params = await searchParams;
  const data = await AccountantRequestsAPI.fetchAccountantRequests(params);

  return (
    <AccountantRequestsProvider data={data.items.at(0)?.requests || []}>
      <Table
        selectAllComponent={SelectAll}
        columns={ACCOUNTANT_REQUESTS_COLUMNS}
        renderData={
          <>
            {data.items.at(0)?.requests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell>
                  <AccountRequestActions requestId={request.requestId} />
                </TableCell>
                <TableCell>{formatCurrency(request.amountInCash)}</TableCell>
                <TableCell>{formatCurrency(request.amountInCredit)}</TableCell>
                <TableCell>{formatCurrency(request.amount)}</TableCell>
                <TableCell>{request.toEmployeeName}</TableCell>
                <TableCell>{request.fromEmployeeName}</TableCell>
                <TableCell>
                  {
                    RequestType[
                      request.requestTypeName as keyof typeof RequestType
                    ]
                  }
                </TableCell>
                <TableCell>
                  {formatDate(request.requestDate, "datetime")}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <Pagination
        page={data.pageNumber}
        searchParams={params}
        totalPages={data.totalPages}
      />
    </AccountantRequestsProvider>
  );
}

export default page;
