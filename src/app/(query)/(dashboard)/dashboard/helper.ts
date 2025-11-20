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
