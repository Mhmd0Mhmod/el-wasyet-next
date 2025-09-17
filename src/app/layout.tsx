import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "الوسيط | El-Wasyet",
  description:
    "A platform to manage your wills and testaments easily and securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased`}>{children}</body>
    </html>
  );
}
