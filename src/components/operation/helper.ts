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
  const translations: { [key: string]: string } = {
    pending: "قيد الانتظار",
    "new order": "أمر جديد ",
    cancel: "إلغاء",
    refund: "استرداد",
    "ask expenses": "طلب تحصيل",
    "under processing": "تحت المعالجة",
    "stefa client": "استيفاء عميل",
    "stefa certificate": "استيفاء شهادة",
    return: "إرجاع",
    completed: "مكتمل",
    "stefa sgl": "استيفاء السجل ",
    contacted: "تم الاتصال",
    "send code": "إرسال الرمز",
    "write code": "كتابة الرمز",
    "receiving done": "تم الاستلام",
    "collection done": "تحصيل مكتمل",
  };
  return translations[text.toLowerCase()] || text;
};
