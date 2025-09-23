interface Service {
  id: number;
  name: string;
  defaultFees: number;
  bankFees: number;
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

type ShortWorkFlow = {
  id: number;
  name: string;
  defaultSequence: number;
};
type ServiceForm = {
  id: number;
  name: stirng;
  value: number;
};
export type {
  Service,
  ServiceForm,
  ServiceDocument,
  ServiceWorkflow,
  ServiceOverhead,
  ShortWorkFlow,
};
