import NewOrderForm from "@/components/orders/NewOrderForm";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/data/orders";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderDetails = await getOrderById(id);
  if (!orderDetails) notFound();
  return (
    <section className="container space-y-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <Link href={"/orders"} className="text-gray-500 hover:underline">
            <ArrowRight className="inline-block" size={24} />
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">تعديل الاوامر</h1>
          <p className="text-gray-500">
            تعديل الأمر الخاص بـ {orderDetails.clientName} - كود الأمر #
            {orderDetails.orderCode}
          </p>
        </div>
      </div>

      <NewOrderForm />
    </section>
  );
}
export default page;
