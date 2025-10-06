import { ServiceOverhead } from "@/types/service";
import { AxiosError } from "axios";
import { AuthError } from "next-auth";

export const NAVBARLINKS = [
  { label: "الفروع", href: "/branches" },
  { label: "الخدمات", href: "/services" },
  { label: "الموظفين", href: "/employees" },
  { label: "العملاء", href: "/clients" },
  { label: "الأوامر", href: "/orders" },
  { label: "أمر جديد", href: "/orders/new" },
  {
    label: "العمليات",
    children: [
      { label: "سجل الاوامر المعلقة", href: "/pending-orders" },
      {
        label: "سجل الشهادات المعلقة",
        href: "/pending-certificates",
      },
      { label: "سجل الشهادات الجديدة", href: "/new-certificates" },
      { label: "سجل الاوامر الجديدة", href: "/new-orders" },
      { label: "سجل تم التحصيل", href: "/collected" },
      { label: "سجل تحت التنفيذ", href: "/in-progress" },
      { label: "سجل الاوامر المنتهية", href: "/completed-orders" },
      { label: "سجل استلام الاوامر", href: "/order-receipt" },
      { label: "سجل استيفاء", href: "/fulfillment" },
      { label: "سجل استيفاء عميل", href: "/client-fulfillment" },
      {
        label: "سجل استيفاء شهادة",
        href: "/certificate-fulfillment",
      },
    ],
  },
];

export const formatCurrency = (value: number) => {
  if (!value) return "0.00 ج.م";
  return Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
  }).format(value);
};

export const formatDate = (
  dateString: string,
  type: "date" | "datetime" | "time",
) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  const options: Intl.DateTimeFormatOptions =
    type === "date"
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : type === "time"
        ? { hour: "2-digit", minute: "2-digit", hour12: true }
        : {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };

  return date.toLocaleString("ar-EG", options);
};

export const handleErrorResponse = (
  error: Error | AuthError | unknown,
): APIResponse<null> => {
  const returnError = {
    success: false,
    data: null,
    message: "An unexpected error occurred while Process",
  };
  if (error instanceof AuthError) {
    returnError.message = error.message;
  }
  if (error instanceof AxiosError) {
    const errors = Object.values(error.response?.data.errors || {});
    if (errors.length > 0) {
      returnError.message = errors.join(" ");
    } else {
      returnError.message = error.response?.data.message || error.message;
    }
  } else if (error instanceof Error) {
    returnError.message = error.message;
  }
  return returnError;
};

export const convertOverheadLabel = (overhead: ServiceOverhead): string => {
  if (overhead.penalty) return "غرامة";
  if (overhead.adminFees) return "رسوم إدارية";
  if (overhead.forms) return "استمارات";
  return "";
};

export const getOrderStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "مكتمل":
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "قيد المعالجة":
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ملغي":
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "في الانتظار":
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
