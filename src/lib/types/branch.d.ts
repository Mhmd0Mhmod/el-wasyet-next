export interface Branch {
  id: string;
  name: string;
  address: string;
  manager: string;
  email: string;
  phone?: string;
}
export interface CreateBranchDTO {
  name: string;
  address: string;
  manager: string;
  email: string;
  manager: string;
  email: string;
  phone?: string;
}

export interface BranchService {
  id: string;
  serviceName: string;
  fee: string;
  documents: string;
  serviceSteps: string;
  additionalFees: string;
}

export interface BranchActivity {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in-progress";
}
