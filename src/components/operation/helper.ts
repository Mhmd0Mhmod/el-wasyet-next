import { Clock, AlertCircle, Bell } from "lucide-react";
export const getRemainingDaysStyle = (dueDate: number) => {
  if (dueDate === 0) {
    return {
      text: "اليوم",
      className: "text-yellow-600 bg-yellow-50 border border-yellow-200",
      icon: Clock,
    };
  }

  if (dueDate < 0) {
    const daysPassed = Math.abs(dueDate);
    return {
      text: `منتهي منذ ${daysPassed} يوم`,
      className: "text-red-600 bg-red-50 border border-red-200",
      icon: AlertCircle,
    };
  }

  return {
    text: `${dueDate} أيام`,
    className: "text-green-600 bg-green-50 border border-green-200",
    icon: Bell,
  };
};

export const translateToArabic = (text: string): string => {
  // normalize: lowercase and remove spaces
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
    collectiondone: "تحصيل مكتمل",
    expired: "تخطي الموعد",
  };
  return translations[key] || text;
};
