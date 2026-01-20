import Table from "@/components/shared/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  ACCOUNTANT_REQUESTS_ASK_EXPENSES_COLUMNS,
  AccountantRequestRowColor,
} from "@/constants/accountant-requests";
import {
  AccountantRequestItem,
  RequestTypes,
} from "@/lib/api/accountant-requests";
import { formatCurrency, formatDate } from "@/lib/helper";
import RequestStatus from "./AccountantRequestStatus";
import AccountRequestActions, {
  AcceptWithCashRequestAction,
  AcceptWithCreditRequestAction,
  RejectRequestAction,
} from "./AccountRequestActions";
import Link from "next/link";

function AskExpensesTable({ data }: { data: AccountantRequestItem[] }) {
  return (
    <Table
      columns={ACCOUNTANT_REQUESTS_ASK_EXPENSES_COLUMNS}
      renderData={
        <>
          {data.map((request) => (
            <RenderRequestRow key={request.requestId} request={request} />
          ))}
        </>
      }
    />
  );
}
function RenderRequestRow({ request }: { request: AccountantRequestItem }) {
  return (
    <TableRow className={AccountantRequestRowColor(request.requestStatusName)}>
      <AccountRequestActions requestId={request.requestId}>
        <TableCell>
          <AcceptWithCashRequestAction />
        </TableCell>
        <TableCell>
          <AcceptWithCreditRequestAction />
        </TableCell>
        <TableCell>
          <RejectRequestAction />
        </TableCell>
      </AccountRequestActions>
      <TableCell>
        <Link
          href={`/orders/${request.orderId}`}
          className="text-primary hover:underline"
        >
          {request.orderId}
        </Link>
      </TableCell>
      <TableCell>
        <RequestStatus status={request.requestStatusName} />
      </TableCell>
      <TableCell>{formatCurrency(request.amountInCash)}</TableCell>
      <TableCell>{formatCurrency(request.amountInCredit)}</TableCell>
      <TableCell>{formatCurrency(request.amount)}</TableCell>
      <TableCell>{request.toEmployeeName}</TableCell>
      <TableCell>{request.fromEmployeeName}</TableCell>
      <TableCell>{RequestTypes[request.requestTypeName].label}</TableCell>
      <TableCell>{formatDate(request.requestDate, "datetime")}</TableCell>
    </TableRow>
  );
}
export default AskExpensesTable;
