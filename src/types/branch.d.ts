export interface Branch {
  services: Service[];
  id: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
  managerName: string;
  managerId: number;
  suspended: boolean;
}

export interface ShortBranch {
  branchId: number;
  branchName: string;
}
