import PageLayout from "@/components/Layout/PageLayout";
import WhatsAppShareButton from "@/components/main/orders/[id]/whatsapp-share-button";
import DetailedExpensesCard from "@/components/main/orders/DetailedExpensesCard";
import DocumentsCard from "@/components/main/orders/DocumentsCard";
import DownloadPDF from "@/components/main/orders/DownloadPDF";
import ExportReceiptButton from "@/components/main/orders/ExportReceiptButton";
import NotesCard from "@/components/main/orders/NotesCard";
import OrderDetailsCard from "@/components/main/orders/OrderDetailsCard";
import OrderSummaryCard from "@/components/main/orders/OrderSummaryCard";
import RequiredChangesCard from "@/components/main/orders/RequiredChangesCard";
import UploadedFilesCard from "@/components/main/orders/UploadedFilesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/data/orders";
import { getFullURL } from "@/lib/helper";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderDetails = await getOrderById(id);
  if (!orderDetails) notFound();
  return (
    <PageLayout
      title="تفاصيل الاوامر"
      description="إدارة أوامر العملاء ومتابعة حالة الخدمات"
    >
      {/* Order Summary Card */}
      <OrderSummaryCard orderDetails={orderDetails} />

      {/* Order Details Card */}
      <OrderDetailsCard orderDetails={orderDetails} />

      {/* Detailed Expenses Card */}
      <DetailedExpensesCard
        expenses={
          orderDetails.overheads?.map((overhead, index) => ({
            id: index,
            description: overhead.description,
            value: overhead.value,
          })) || []
        }
      />

      {/* Discounts and Increases Cards Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold sm:text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <TrendingDown className="h-4 w-4 text-blue-600" />
              </div>
              الخصومات
            </CardTitle>{" "}
            <CardContent className="rounded-lg bg-blue-50 p-3 text-sm sm:text-base">
              {orderDetails.imageUrlForOffer && (
                <div className="relative aspect-square">
                  <Image
                    src={getFullURL(orderDetails.imageUrlForOffer)}
                    alt="Offer Image"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {orderDetails.offerName || "لا توجد خصومات"}
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold sm:text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <TrendingUp className="h-4 w-4 text-red-600" />
              </div>
              الزيادات
            </CardTitle>
            <CardContent className="rounded-lg bg-red-50 p-3 text-sm sm:text-base">
              {orderDetails.agentName || "لا توجد زيادات"}
            </CardContent>
          </CardHeader>
        </Card>

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
      <Card className="shadow-sm" dir="rtl">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">
            الملفات المحملة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Uploaded Files Card */}
          <UploadedFilesCard files={orderDetails.files || []} />
          <Separator />
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <ExportReceiptButton orderId={orderDetails.id} />
            <DownloadPDF orderId={orderDetails.id} />
            <WhatsAppShareButton orderId={orderDetails.id} />
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
export default page;
