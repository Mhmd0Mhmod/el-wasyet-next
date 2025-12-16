import PageLayout from "@/components/Layout/PageLayout";
import ClientSelector from "@/components/main/orders/ClientSelector";
import DocumentSelector from "@/components/main/orders/DocumentSelector";
import FinancialDetailsForm from "@/components/main/orders/FinancialDetailsForm";
import OrderDetailsForm from "@/components/main/orders/OrderDetailsForm";
import OrderIsPendingSwitch from "@/components/main/orders/OrderIsPendingSwitch";
import OverheadsForms from "@/components/main/orders/OverheadsForms";
import ResetButton from "@/components/main/orders/ResetButton";
import ServiceTypeSelector from "@/components/main/orders/ServiceTypeSelector";
import SubmitButton from "@/components/main/orders/SubmitButton";
import UploadDocumentButton from "@/components/main/orders/UploadDocumentButton";
import OrderFormProvider from "@/components/providers/OrderFormProvider";
import { Label } from "@/components/ui/label";
import { getAgents, getOffers } from "@/data/orders";
import { authFetch } from "@/lib/axios";
import { OrderFormValues } from "@/schema/order";
import { OverheadValues } from "@/schema/service";
import { OrderDocument, OrderFile, OrderOverhead } from "@/types/order";
import { notFound } from "next/navigation";
interface OVERHEAD {
  id: number;
  overheadID: number;
  description: string;
  value: number;
  penalty: boolean;
  forms: boolean;
  adminFees: boolean;
  formTypeId: number;
  penaltyExtraFee: number;
}
interface OrderDetails {
  id: number;
  isPending: boolean;
  serviceID: number;
  clientId: number;
  serviceName: string;
  serviceFees: number;
  amount: number;
  cash: number;
  credit: number;
  imageUrlForOffer?: string;
  comments_id_Wife_Mother: string;
  quantity: number;
  deliveryAddress: string;
  birthDate: string;
  requiredChange_forthName_Husbend: string;
  currentStatusId: number;
  currentStatusName: string;
  agentId: number;
  agentName: string;
  offerId: number;
  offerName: string;
  orderoverheads: OVERHEAD[];
  customOverheads: OVERHEAD[];
  documents: OrderDocument[];
  customDocuments: OrderDocument[];
  files: OrderFile[];
}
async function getOrderForUpdateById(id: string) {
  try {
    const response = await authFetch.get<OrderDetails>(
      `Order/GetOrderForUpdateOrder/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const orderDetails = await getOrderForUpdateById(id);

  if (!orderDetails) {
    notFound();
  }
  const offers = await getOffers();
  const agents = await getAgents();
  const orderFormData: OrderFormValues & {
    OrderId: number;
  } = {
    OrderId: orderDetails.id,
    ClientId: orderDetails.clientId,
    AgentId: orderDetails.agentId || undefined,
    OfferId: orderDetails.offerId || undefined,
    ServiceFees: orderDetails.serviceFees,
    ServiceId: orderDetails.serviceID,
    IsPending: orderDetails.isPending,
    Amount: orderDetails.amount,
    Cash: orderDetails.cash,
    Credit: orderDetails.credit,
    DeliveryAddress: orderDetails.deliveryAddress,
    BirthDate: orderDetails.birthDate,
    RequiredChange: orderDetails.requiredChange_forthName_Husbend,
    Quantity: orderDetails.quantity,
    Documents: orderDetails.documents.map((doc) => doc.id),
    CustomDocuments: orderDetails.customDocuments.map((doc) => ({
      id: doc.id,
      Description: doc.documentName,
    })),
    OverheadIds: orderDetails.orderoverheads.map(
      (overhead) => overhead.overheadID,
    ),
    CustomOverheads: orderDetails.customOverheads,
    Notes: orderDetails.comments_id_Wife_Mother,
    imageurlStringForOffer: orderDetails.imageUrlForOffer,
    CreateFiles: orderDetails.files.map((file) => ({
      id: file.id,
      fileUrl: file.fileUrl,
      fileExtension: file.fileExtension,
      FileTypeId: file.fileTypeID,
      fileTypeName: file.fileTypeName,
    })),
  };
  console.log(orderDetails);

  return (
    <OrderFormProvider
      agents={agents}
      offers={offers}
      orderDetails={orderFormData}
    >
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
