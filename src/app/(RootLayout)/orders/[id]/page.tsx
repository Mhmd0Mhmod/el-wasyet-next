import DetailedExpensesCard from "@/components/orders/DetailedExpensesCard";
import DiscountsCard from "@/components/orders/DiscountsCard";
import DocumentsCard from "@/components/orders/DocumentsCard";
import IncreasesCard from "@/components/orders/IncreasesCard";
import NotesCard from "@/components/orders/NotesCard";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import RequiredChangesCard from "@/components/orders/RequiredChangesCard";
import UploadedFilesCard from "@/components/orders/UploadedFilesCard";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/data/orders";
import { ArrowRight, Edit3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderDetails = await getOrderById(Number(id));
  if (!orderDetails) notFound();

  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost">
            <Link href={"/orders"} className="text-gray-500 hover:underline">
              <ArrowRight className="inline-block" size={24} />
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">تفاصيل الاوامر</h1>
            <p className="text-gray-500">
              إدارة أوامر العملاء ومتابعة حالة الخدمات
            </p>
          </div>
        </div>
        <Button>
          <Link href={`/orders/${id}/edit`}>
            <Edit3 className="inline-block" size={16} />
            تعديل الأمر
          </Link>
        </Button>
      </div>

      {/* Order Summary Card */}
      <OrderSummaryCard orderDetails={orderDetails} />

      {/* Order Details Card */}
      <OrderDetailsCard orderDetails={orderDetails} />

      {/* Detailed Expenses Card */}
      <DetailedExpensesCard
        expenses={
          orderDetails.overheads?.map((overhead) => ({
            id: overhead.overheadID,
            description: overhead.description,
            value: overhead.value,
          })) || []
        }
      />

      {/* Discounts and Increases Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <IncreasesCard increases={[]} total={0} />
        <DiscountsCard discounts={[]} total={0} />
        <DocumentsCard
          documents={
            orderDetails.documents?.map((doc) => ({
              id: doc.id,
              name: doc.documentName,
              checked: true,
            })) || []
          }
        />
        <NotesCard notes={orderDetails.notes || "لا توجد ملاحظات"} />
      </div>

      {/* Required Changes Card */}
      <RequiredChangesCard
        requiredChanges={
          orderDetails.requiredChange || "لا توجد تغييرات مطلوبة"
        }
      />

      {/* Uploaded Files Card */}
      <UploadedFilesCard uploadedFiles={[]} outputFiles={[]} />
    </section>
  );
}
export default page;
