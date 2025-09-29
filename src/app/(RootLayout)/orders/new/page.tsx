import NewOrderForm from "@/components/orders/NewOrderForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <section className="container space-y-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <Link href={"/orders"} className="text-gray-500 hover:underline">
            <ArrowRight className="inline-block" size={24} />
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">تفاصيل الاوامر</h1>
          <p className="text-gray-500">
            إدارة أوامر العملاء ومتابعة حالة الخدمات
          </p>
        </div>
      </div>

      <NewOrderForm />
    </section>
  );
}
export default page;
