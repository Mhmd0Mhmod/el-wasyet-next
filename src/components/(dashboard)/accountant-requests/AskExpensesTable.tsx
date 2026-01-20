import {
  AcceptAllAskExpenseActionWithCash,
  AcceptAllAskExpenseActionWithCredit,
} from "@/components/providers/AccountantRequestsProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ACCOUNTANT_REQUESTS_COLUMNS,
  AccountantRequestRowColor,
} from "@/constants/accountant-requests";
import {
  AccountantRequestItem,
  RequestTypes,
} from "@/lib/api/accountant-requests";
import { formatCurrency, formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RequestStatus from "./AccountantRequestStatus";
import AccountRequestActions, {
  AcceptWithCashRequestAction,
  AcceptWithCreditRequestAction,
  RejectRequestAction,
} from "./AccountRequestActions";

function AskExpensesTable({ data }: { data: AccountantRequestItem[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <AcceptAllAskExpenseActionWithCash />
            </TableHead>
            <TableHead>
              <AcceptAllAskExpenseActionWithCredit />
            </TableHead>
            <TableHead>رفض</TableHead>
            {ACCOUNTANT_REQUESTS_COLUMNS.map((column) => (
              <TableHead key={column.id} className="text-center">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <RenderRequestRow key={request.requestId} request={request} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
function RenderRequestRow({ request }: { request: AccountantRequestItem }) {
  return (
    <TableRow
      className={cn(
        AccountantRequestRowColor(request.requestStatusName),
        "ps-2",
      )}
    >
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
