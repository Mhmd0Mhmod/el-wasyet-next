import { AxiosError } from "axios";
import { AuthError } from "next-auth";

export const NAVBARLINKS = [
  { label: "الفروع", href: "/branches" },
  { label: "الخدمات", href: "/services" },
  { label: "الموظفين", href: "/employees" },
  { label: "العملاء", href: "/clients" },
  { label: "الأوامر", href: "/orders" },
];

export const formatCurrency = (value: number) => {
  if (!value) return "0.00 ج.م";
  return Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
  }).format(value);
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
