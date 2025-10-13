import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import Actions from "./actions/PendingActoins";
import OrdersTable from "./tables/OrdersTable";

async function PendingOrders({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <OrdersTable orders={orders} ActionsSelect={Actions} />
    </OperationsProvider>
  );
}
export default PendingOrders;
