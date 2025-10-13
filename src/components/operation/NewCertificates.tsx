import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import CertificatesTable from "./tables/CertificatesTable";
import Actions from "./actions/PendingActoins";
function NewCertificates({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <CertificatesTable orders={orders} ActionsSelect={Actions} />
    </OperationsProvider>
  );
}
export default NewCertificates;
