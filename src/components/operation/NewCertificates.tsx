import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import CertificatesTable from "./tables/CertificatesTable";

function NewCertificates({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <CertificatesTable orders={orders} ActionsSelect={<></>} />
    </OperationsProvider>
  );
}
export default NewCertificates;
