export const ACCOUNTANT_REQUESTS_COLUMNS = [
  { label: "رقم الطلب", id: "orderId" },
  {
    label: "الحالة",
    id: "requestStatusName",
  },
  {
    label: "كاش",
    id: "cash",
  },
  {
    label: "كريديت",
    id: "credit",
  },
  {
    label: "المبلغ",
    id: "amount",
  },
  {
    label: "موظف الحسابات",
    id: "accountant",
  },
  {
    label: "موظف",
    id: "employee",
  },
  {
    label: "التفاصيل",
    id: "details",
  },
  {
    label: "التاريخ",
    id: "date",
  },
];

export const AccountantRequestRowColor = (status: string) => {
  const colors = {
    Pending: "bg-yellow-100",
    Approved: "bg-green-100",
    Rejected: "bg-red-100",
  };
  return colors[status as keyof typeof colors] || "";
};
