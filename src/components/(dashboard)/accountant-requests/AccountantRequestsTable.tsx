import { AcceptAllRequests } from "@/components/providers/AccountantRequestsProvider";
import Link from "@/components/shared/Link";
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
import RequestStatus from "./AccountantRequestStatus";
import AccountRequestActions, {
  AcceptRequestAction,
  PartialAcceptRequestAction,
  RejectRequestAction,
} from "./AccountRequestActions";

function AccountantRequestsTables({ data }: { data: AccountantRequestItem[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <AcceptAllRequests />
            </TableHead>
            <TableHead>قبول جزئي</TableHead>
            <TableHead>رفض</TableHead>
            {ACCOUNTANT_REQUESTS_COLUMNS.map((column) => (
              <TableHead key={column.id}>{column.label}</TableHead>
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
    <TableRow className={AccountantRequestRowColor(request.requestStatusName)}>
      <AccountRequestActions requestId={request.requestId}>
        <TableCell>
          <AcceptRequestAction />
        </TableCell>
        <TableCell>
          <PartialAcceptRequestAction />
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
export default AccountantRequestsTables;
