import { BranchService } from "../types/branch";

export const SERVICES_DATA: BranchService[] = [
  {
    id: "1",
    serviceName: "استخراج شهادة ميلاد",
    fee: "50 ج.م",
    documents: "عرض(3)",
    serviceSteps: "عرض(3)",
    additionalFees: "---",
  },
  {
    id: "2",
    serviceName: "استخراج شهادة ميلاد",
    fee: "50 ج.م",
    documents: "عرض(3)",
    serviceSteps: "عرض(3)",
    additionalFees: "---",
  },
  {
    id: "3",
    serviceName: "استخراج شهادة ميلاد",
    fee: "50 ج.م",
    documents: "عرض(3)",
    serviceSteps: "عرض(3)",
    additionalFees: "---",
  },
  {
    id: "4",
    serviceName: "استخراج شهادة ميلاد",
    fee: "50 ج.م",
    documents: "عرض(3)",
    serviceSteps: "عرض(3)",
    additionalFees: "---",
  },
];

export const ServicesTableHeaders = [
  { id: "serviceName", label: "اسم الخدمه" },
  { id: "fee", label: "الرسوم" },
  { id: "documents", label: "المستندات" },
  { id: "serviceSteps", label: "خطوات الخدمه" },
  { id: "additionalFees", label: "رسوم اضافيه" },
  { id: "actions", label: "العمليات" },
];
