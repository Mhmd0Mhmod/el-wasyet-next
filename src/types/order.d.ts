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

export const orderColumns = [
  { id: "orderId", label: "رقم الأمر" },
  { id: "serviceName", label: "الخدمة" },
  { id: "createdAt", label: "تاريخ الأمر" },
  { id: "orderStatue", label: "حالة الأمر" },
  { id: "requiredChange", label: "المطلوب" },
  { id: "amount", label: "قيمة الأمر" },
  { id: "note", label: "ملحوظات" },
  { id: "actions", label: "العمليات" },
];
