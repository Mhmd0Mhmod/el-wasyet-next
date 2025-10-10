import PageLayout from "@/components/Layout/PageLayout";
import ClientSelector from "@/components/orders/ClientSelector";
import DocumentSelector from "@/components/orders/DocumentSelector";
import FinancialDetailsForm from "@/components/orders/FinancialDetailsForm";
import OrderDetailsForm from "@/components/orders/OrderDetailsForm";
import OrderIsPendingSwitch from "@/components/orders/OrderIsPendingSwitch";
import OverheadsForms from "@/components/orders/OverheadsForms";
import ResetButton from "@/components/orders/ResetButton";
import ServiceTypeSelector from "@/components/orders/ServiceTypeSelector";
import SubmitButton from "@/components/orders/SubmitButton";
import UploadDocumentButton from "@/components/orders/UploadDocumentButton";
import OrderFormProvider from "@/components/providers/OrderFormProvider";
import { Label } from "@/components/ui/label";
function page() {
  return (
    <OrderFormProvider>
      <PageLayout
        title="تفاصيل الأوامر"
        description="إدارة أوامر العملاء ومتابعة حالة الخدمات"
        extra={
          <div className="bg-primary/10 m-auto flex w-11/12 items-center justify-between gap-10 rounded-xl px-8 py-2 md:m-0 md:w-auto md:justify-start">
            <Label htmlFor="is-pending" className="text-md font-medium">
              هل تريد جعل هذا الأمر معلقًا؟
            </Label>
            <OrderIsPendingSwitch />
          </div>
        }
        backButton
      >
        <div className="md:gap-6 xl:grid xl:grid-cols-[1fr_auto] xl:items-start">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4>العميل والخدمة</h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <ClientSelector />
                <ServiceTypeSelector />
              </div>
            </div>
            <div className="space-y-2">
              <h4>التفاصيل المالية</h4>
              <FinancialDetailsForm />
            </div>
            <OrderDetailsForm />
          </div>
          <DocumentSelector />
          <div className="col-span-2">
            <OverheadsForms />
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-4">
          <ResetButton />
          <UploadDocumentButton />
          <SubmitButton />
        </div>
      </PageLayout>
    </OrderFormProvider>
  );
}
export default page;
