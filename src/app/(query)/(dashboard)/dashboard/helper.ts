import {
  BadgePercent,
  CircleDollarSign,
  Coins,
  Files,
  Handshake,
  Home,
} from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    label: "الصفحة الرئيسية",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "عهده الاستمارات",
    href: "/stock",
    icon: Files,
  },
  {
    label: "الخزنه",
    href: "/cashbox",
    icon: CircleDollarSign,
  },
  {
    label: "الخصومات",
    href: "/discounts",
    icon: BadgePercent,
  },
  {
    label: "الوكلاء",
    href: "/agents",
    icon: Handshake,
  },
  {
    label: "العمولات",
    href: "/commissions",
    icon: Coins,
  },
];

export const translateToArabic = (text: string): string => {
  const key = (text ?? "").toString().toLowerCase().replace(/\s+/g, "");
  const translations: { [key: string]: string } = {
    pending: "قيد الانتظار",
    neworder: "أمر جديد ",
    new: "جديد",
    inprogress: "قيد المعالجة",
    receivedbyclient: "تم الاستلام من العميل",
    cancel: "إلغاء",
    canceled: "ملغي",
    returned: "مرتجع",
    refund: "استرداد",
    askexpenses: "طلب تحصيل",
    underprocessing: "تحت المعالجة",
    stefaclient: "استيفاء عميل",
    stefacertificate: "استيفاء شهادة",
    stefacertifacte: "استيفاء شهادة",
    return: "إرجاع",
    completed: "مكتمل",
    stefasgl: "استيفاء السجل ",
    contacted: "تم الاتصال",
    sendcode: "إرسال الرمز",
    writecode: "كتابة الرمز",
    receivingdone: "تم الاستلام",
    collectiondone: "تم التحصيل",
    expired: "تخطي الموعد",
  };
  return translations[key] || text;
};
