interface Service {
  id: number;
  name: string;
  defaultFees: number;
  banktFees: number;
  validityPeriodDays: number;
  isCertificate: boolean;
  suspended: boolean;
  expiryPeriodYears: number;
  documents: ServiceDocument[];
  workflows: ServiceWorkflow[];
  overheads: ServiceOverhead[];
}

interface ServiceDocument {
  id: number;
  description: string;
}
interface ServiceWorkflow {
  id: number;
  serviceId: number;
  orderStatusName: string;
  orderStatusId: number;
  sequence: number;
}
interface ServiceOverhead {
  id: number;
  value: number;
  description: string;
  penalty: boolean;
  forms: boolean;
  adminFees: boolean;
  formTypeID: number | null;
}

export type { Service, ServiceDocument, ServiceWorkflow, ServiceOverhead };
