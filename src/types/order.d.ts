import { Service, ServiceDocument, ServiceOverhead } from "./service";

export interface ShortOrder {
  orderId: number;
  serviceName: string | null;
  createdAt: string;
  orderStatue: null | string;
  requiredChange: string;
  amount: number;
  note: string;
}
interface Order {
  id: number;
  orderCode: string;
  serviceName: string;
  clientName: string;
  clientPhoneNumber: string;
  orderDate: string;
  orderStatus: string;
  requiredChange: string;
  amount: number;
  notes: string;
  isRelatedToOffer: boolean;
  isFromApp: boolean;
  recevingStatues: string;
}

interface OrderDetails extends Order {
  branchName: string;
  netAmount: number;
  expenses: number;
  cash: number;
  credit: number;
  agentName: string | null;
  agentId: number | null;
  overheads: [
    {
      overheadID: number;
      description: string;
      value: number;
    },
  ];
  documents: [
    {
      id: number;
      documentName: string;
    },
  ];
  deliveryAddress: string;
  createdDate: string;
  createdBy: string;
}
interface Offer {
  offerId: nubmer;
  companyName: string;
  discountPercentage: number;
  isActive: booelean;
}

interface Agent {
  id: number;
  name: string;
  commissionPercentage: nubmer;
}

interface OrderService extends Omit<Service, "documents" | "overheads"> {
  documentForCreateDTOs: ServiceDocument[];
  overheadForCreates: Omit<ServiceOverhead, "description" | "formTypeID">[];
}
