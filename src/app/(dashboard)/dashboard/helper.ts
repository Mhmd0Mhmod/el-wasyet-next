import { Home, Store, Wallet, Percent, Users, DollarSign } from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    label: "الصفحة الرئيسية",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "المخازن",
    href: "/stores",
    icon: Store,
  },
  {
    label: "الخزنه",
    href: "/cashbox",
    icon: Wallet,
  },
  {
    label: "الخصومات",
    href: "/discounts",
    icon: Percent,
  },
  {
    label: "الوكلاء",
    href: "/agents",
    icon: Users,
  },
  {
    label: "العمولات",
    href: "/commissions",
    icon: DollarSign,
  },
];
