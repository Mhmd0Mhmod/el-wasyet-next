interface Report {
  id: number;
  serviceName: string;
  clientName: string;
  clientPhoneNumber: string;
  amount: number;
  cash: number;
  credit: number;
  orderDateTime: string;
  branchName: string;
  employeeName: string;
  expenses: number;
  netAmount: number;
}
interface ReportDetails extends Report {
  clientId: string;
}
