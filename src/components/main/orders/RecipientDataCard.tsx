import { getFullURL } from "@/lib/helper";
import { OrderDetails } from "@/types/order";
import Image from "next/image";

interface RecipientDataCardProps {
  orderDetails: OrderDetails;
}

export default function RecipientDataCard({
  orderDetails,
}: RecipientDataCardProps) {
  const hasRecipientData =
    orderDetails.receivedByWho || orderDetails.receivedByWhoUrl;

  if (!hasRecipientData) {
    return null;
  }

  return (
    <div className="space-y-4">
      {orderDetails.receivedByWho && (
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700">اسم المستلم:</span>
          <span className="text-gray-900">{orderDetails.receivedByWho}</span>
        </div>
      )}

      {orderDetails.receivedByWhoUrl && (
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
          <span className="font-medium text-gray-700">صورة بطاقة المستلم:</span>
          <div className="relative aspect-3/2 w-full max-w-sm overflow-hidden rounded-lg border">
            <Image
              src={getFullURL(orderDetails.receivedByWhoUrl)}
              alt={`صورة بطاقة ${orderDetails.receivedByWho || "المستلم"}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
