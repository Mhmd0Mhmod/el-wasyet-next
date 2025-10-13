import { OrderByStatus } from "@/types/order";
import { OperationsProvider } from "../providers/OperationsProvider";
import OrdersTable from "./tables/OrdersTable";
import Actions from "./actions/PendingActoins";
function CompletedOrders({ orders }: { orders: OrderByStatus[] }) {
  return (
    <OperationsProvider>
      <OrdersTable orders={orders} ActionsSelect={Actions} />
    </OperationsProvider>
  );
}
export default CompletedOrders;
