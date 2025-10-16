import { Service, ServiceDocument, ServiceOverhead } from "./service";

// Base entity interface for common fields
interface BaseEntity {
  id: number;
}

// Common fields shared across order-related interfaces
interface OrderCommonFields {
  serviceName: string;
  clientName: string;
  orderStatus: string;
  requiredChange: string;
  amount: number;
}

// Common client fields pattern
interface ClientFields {
  clientName: string;
  clientId: number;
  clientPhoneNumber: string;
}

// Common order identification fields
interface OrderIdentification {
  orderCode: string;
}

// Reusable overhead structure
interface OrderOverhead {
  overheadID: number;
  description: string;
  value: number;
}

// Reusable document structure
interface OrderDocument {
  id: number;
  documentName: string;
}

// Reusable file structure
interface OrderFile {
  id: number;
  fileUrl: string;
  fileExtension: string;
  fileTypeID: number;
  fileTypeName: string | null;
  orderID: number;
}

// Financial fields pattern
interface FinancialFields {
  amount: number;
  netAmount: number;
  expenses: number;
  cash: number;
  credit: number;
}

export interface OrderByStatusShortOrder {
  orderId: number;
  serviceName: string | null;
  createdAt: string;
  orderStatue: null | string;
  requiredChange: string;
  amount: number;
  note: string;
}

interface Order
  extends BaseEntity,
    OrderCommonFields,
    ClientFields,
    OrderIdentification {
  orderDate: string;
  notes: string;
  isRelatedToOffer: boolean;
  isFromApp: boolean;
  recevingStatues: string;
}

interface OrderDetails extends Order, Omit<FinancialFields, "amount"> {
  branchName: string;
  createdDate: string;
  createdBy: string;
  deliveryAddress: string;
  agentName: string;
  agentId: string;
  offerName: string;
  offerId: string;
  overheads: OrderOverhead[];
  documents: OrderDocument[];
  files: OrderFile[];
}

interface Offer {
  offerId: nubmer;
  companyName: string;
  discountPercentage: number;
  isActive: booelean;
}

interface Agent extends BaseEntity {
  name: string;
  commissionPercentage: nubmer;
}

interface OrderService extends Omit<Service, "documents" | "overheads"> {
  documentForCreateDTOs: ServiceDocument[];
  overheadForCreates: Omit<ServiceOverhead, "description" | "formTypeID">[];
}

interface OrderLog
  extends BaseEntity,
    ClientFields,
    Pick<OrderCommonFields, "serviceName" | "amount" | "requiredChange"> {
  actionDate: string;
  orderID: number;
  orderCode: string | null;
  operationTypeId: number;
  operationTypeName: string;
  employeeId: number;
  employeeName: string;
  orderStatues: string;
  comments: string;
}

interface OrderByStatus
  extends Pick<ClientFields, "clientName" | "clientId">,
    Pick<OrderCommonFields, "serviceName" | "orderStatus"> {
  orderId: number;
  orderCode: string;
  serviceId: number;
  employeeId: number;
  orderStatusForAction: string;
  orderDate: string;
  birthDate: string | null;
  remainingDays: number;
  isThirdTimeRemaining: boolean;
  comments_id_Wife_Mother: string;
  requiredChange_forthName_Husbend: string;
  overheads: string[];
  finesRealCost: number;
  fines: string;
  createdBy: string;
  branchName: string;
  quantity: number | null;
  closeAskExpense: boolean;
  isStefaClient: boolean;
  isStefaSGL: boolean;
  isStefaCertifacte: boolean;
  notes: string | null;
}
