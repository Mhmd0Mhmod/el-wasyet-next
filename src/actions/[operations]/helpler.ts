const ROUTE_ENDPOINTS: Record<string, string> = {
  "pending-orders": "/OperationLog/pending-orders",
  "new-orders-certificate": "/OperationLog/new-orders-certificate",
  "new-orders-non-certificate": "/OperationLog/new-orders-non-certificate",
  "collection-done": "/OperationLog/collection-done",
  "under-processing": "/OperationLog/under-processing",
  "completed-orders": "/OperationLog/completed-orders",
  "stefa-sgl": "/OperationLog/stefa-sgl",
  "stefa-client": "/OperationLog/stefa-client",
  "stefa-certificate": "/OperationLog/stefa-certificate",
};
function getRouteKey(pathname: string): string {
  const route = pathname.toLowerCase();
  if (
    route.includes("pending-orders") ||
    route.includes("pending-certificates")
  )
    return "pending-orders";
  if (route.includes("new-certificates")) return "new-orders-certificate";
  if (route.includes("new-orders")) return "new-orders-non-certificate";
  if (route.includes("collected")) return "collection-done";
  if (route.includes("in-progress")) return "under-processing";
  if (route.includes("completed-orders")) return "completed-orders";
  if (route.includes("client-fulfillment")) return "stefa-client";
  if (route.includes("certificate-fulfillment")) return "stefa-certificate";
  if (route.includes("fulfillment")) return "stefa-sgl";

  throw new Error(`لا يوجد endpoint محدد للصفحة: ${pathname}`);
}

export function getOperationEndpoint(pathname: string): string {
  const routeKey = getRouteKey(pathname);
  return ROUTE_ENDPOINTS[routeKey];
}
