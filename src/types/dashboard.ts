interface DashboardData {
  performanceCard: performanceCard;
  ordersSummaryCard: ordersSummaryCard;
  offersAndCustomersCard: offersAndCustomersCard;
  branchRevenues: branchRevenues[];
  ordersPerStatus: ordersPerStatus[];
  clientsPerStatus: clientsPerStatus[];
  revenueByServiceTypes: revenueByServiceTypes[];
  expiredOrders: number;
}

type performanceCard = {
  currentMonthIncome: number;
  currentMonthExpenses: number;
  currentMonthProfit: number;
  profitChangeFromLastMonth: number;
};

type ordersSummaryCard = {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
};
type offersAndCustomersCard = {
  totalOrders: number;
  pendingOrders: number;
  totalClients: number;
  newClientsThisMonth: number;
};
type branchRevenues = {
  branchName: string;
  revenue: number;
};
type ordersPerStatus = {
  statusName: string;
  ordersCount: number;
};
type clientsPerStatus = {
  statusName: string;
  clientsCount: number;
};
type revenueByServiceTypes = {
  serviceTypeName: string;
  revenue: number;
};
interface MonthlyPerformancePoint {
  monthName: string;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  completedOrders: number;
}
export type {
  DashboardData,
  performanceCard,
  ordersSummaryCard,
  offersAndCustomersCard,
  branchRevenues,
  ordersPerStatus,
  clientsPerStatus,
  revenueByServiceTypes,
  MonthlyPerformancePoint,
};
