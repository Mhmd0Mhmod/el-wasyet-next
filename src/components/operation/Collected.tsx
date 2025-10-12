import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import OrdersTable from "./tables/OrdersTable";

function Collected({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <OrdersTable orders={orders} ActionsSelect={<></>} />
    </OperationsProvider>
  );
}
export default Collected;
