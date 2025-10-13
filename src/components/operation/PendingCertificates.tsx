import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import Actions from "./actions/PendingActoins";
import CertificatesTable from "./tables/CertificatesTable";

function PendingCertificates({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <CertificatesTable orders={orders} ActionsSelect={Actions} />
    </OperationsProvider>
  );
}
export default PendingCertificates;
