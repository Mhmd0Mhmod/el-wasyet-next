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
  {
    label: "المصروفات",
    href: "/expenses",
  },
  {
    label: "تقارير",
    href: "/reports",
  },
];

export const formatCount = (value: number): string =>
  Intl.NumberFormat("ar-EG").format(value);

export const formatCurrency = (value: number): string => {
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

export const handleErrorResponse = <T>(
  error: Error | AuthError | unknown,
): APIResponse<T> => {
  const returnError = {
    success: false,
    message: "An unexpected error occurred while Process",
  };

  if (error instanceof AuthError) {
    returnError.message = error.message;
  }
  if (error instanceof AxiosError) {
    console.log(error);

    const errors = Object.values(error.response?.data.errors || {});
    if (errors.length > 0) {
      returnError.message = errors.join(" ");
    } else {
      returnError.message = error.response?.data.message || error.message;
    }
  } else if (error instanceof Error) {
    returnError.message = error.message;
  }
  return returnError as APIResponse<T>;
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

export const remainingDays = (dueDate: number): string => {
  if (dueDate === 0) {
    return "اليوم";
  }

  if (dueDate < 0) {
    const daysPassed = Math.abs(dueDate);
    return `منتهي منذ ${daysPassed} يوم`;
  }

  return `متبقي ${dueDate} يوم`;
};

const ENGLISH_TO_ARABIC_MONTH: Record<string, string> = {
  jan: "يناير",
  january: "يناير",
  feb: "فبراير",
  february: "فبراير",
  mar: "مارس",
  march: "مارس",
  apr: "أبريل",
  april: "أبريل",
  may: "مايو",
  jun: "يونيو",
  june: "يونيو",
  jul: "يوليو",
  july: "يوليو",
  aug: "أغسطس",
  august: "أغسطس",
  sep: "سبتمبر",
  sept: "سبتمبر",
  september: "سبتمبر",
  oct: "اكتوبر",
  october: "اكتوبر",
  nov: "نوفمبر",
  november: "نوفمبر",
  dec: "ديسمبر",
  december: "ديسمبر",
};

export const convertMonthToArabic = (month: string): string => {
  const normalized = month?.trim().toLowerCase();
  if (!normalized) return month;
  return (
    ENGLISH_TO_ARABIC_MONTH[normalized] ??
    ENGLISH_TO_ARABIC_MONTH[normalized.slice(0, 3)] ??
    month
  );
};
