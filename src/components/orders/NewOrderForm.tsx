import OrderFromProvider from "../providers/OrderFormProvider";
import ClientSelector from "./ClientSelector";
import DocumentSelector from "./DocumentSelector";
import FinancialDetailsForm from "./FinancialDetailsForm";
import OrderDetailsForm from "./OrderDetailsForm";
import OverheadsForms from "./OverheadsForms";
import ResetButton from "./ResetButton";
import ServiceTypeSelector from "./ServiceTypeSelector";
import SubmitButton from "./SubmitButton";
import UploadDocumentButton from "./UploadDocumentButton";

function NewOrderForm() {
  return (
    <OrderFromProvider>
      <div className="md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-6">
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
    </OrderFromProvider>
  );
}
export default NewOrderForm;
