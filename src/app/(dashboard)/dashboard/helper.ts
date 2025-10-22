import {
  BadgePercent,
  Boxes,
  Coins,
  Handshake,
  Home,
  PiggyBank,
} from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    label: "الصفحة الرئيسية",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "المخازن",
    href: "/stock",
    icon: Boxes,
  },
  {
    label: "الخزنه",
    href: "/cashbox",
    icon: PiggyBank,
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
