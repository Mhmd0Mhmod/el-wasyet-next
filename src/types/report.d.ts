interface Report {
  id: number;
  orderId: number;
  orderCode: string;
  serviceName: string;
  clientName: string;
  clientPhoneNumber: string;
  amount: number;
  employeeName: string;
  orderDateTime: string;
  actionDate: string;
  branchName: string;
  isCreatedByEmployeeName: string;
  operationType: string;
  status: string;
}

interface ExecutiveReport {
  id: number;
  actionType: string;
  clientName: string;
  branchName: string;
  amount: number;
  orderCode: string;
  orderId: number;
  actionDate: string;
  createdbyEmployeeName: string;
  orderstatus: string;
  notes: string;
}
