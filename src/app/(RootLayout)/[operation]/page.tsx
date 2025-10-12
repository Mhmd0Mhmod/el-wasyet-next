import Pagination from "@/components/general/Pagination";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ExportButton from "@/components/operation/actions/ExportButton";
import CertificateFulfillment from "@/components/operation/certificate-fulfillment";
import ClientFulfillment from "@/components/operation/client-fulfillment";
import Collected from "@/components/operation/Collected";
import CompletedOrders from "@/components/operation/CompletedOrders";
import Fulfillment from "@/components/operation/Fulfillment";
import InProgress from "@/components/operation/InProgress";
import NewCertificates from "@/components/operation/NewCertificates";
import NewOrders from "@/components/operation/NewOrders";
import OrderReceipt from "@/components/operation/OrderReceipt";
import PendingCertificates from "@/components/operation/PendingCertificates";
import PendingOrders from "@/components/operation/PendingOrders";
import { getOrdersByStatusIds } from "@/data/orders";
import { OrderByStatus } from "@/types/order";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface OperationConfig {
  statusIds: number[];
  title: string;
  description: string;
  isCertificate?: boolean;
  Component: React.FC<{ orders: OrderByStatus[] }>;
}

const OPERATION_CONFIGS: Record<string, OperationConfig> = {
  "pending-orders": {
    statusIds: [1],
    title: "الاوامر المعلقه",
    description: "سجل أوامر المعلقه ومتابعة حالة الاوامر",
    Component: PendingOrders,
  },
  "pending-certificates": {
    statusIds: [1],
    isCertificate: true,
    title: "الشهادات المعلقة",
    description: "سجل الشهادات المعلقة ومتابعة حالتها",
    Component: PendingCertificates,
  },
  "new-certificates": {
    statusIds: [2],
    title: "الشهادات الجديدة",
    isCertificate: true,
    description: "سجل الشهادات الجديدة ومتابعة حالتها",
    Component: NewCertificates,
  },
  "new-orders": {
    statusIds: [2],
    title: "الاوامر الجديده",
    description: "سجل الاوامر االجديده ومتابعة حالة الاوامر",
    Component: NewOrders,
  },
  collected: {
    statusIds: [3],
    title: "تم التحصيل",
    description: "سجل تم التحصيل ومتابعة حالة الاوامر",
    Component: Collected,
  },
  "in-progress": {
    statusIds: [4],
    title: "تحت التنفيذ",
    description: "سجل الاوامر قيد التنفيذ ومتابعة حالة الاوامر",
    Component: InProgress,
  },
  "completed-orders": {
    statusIds: [5],
    title: "الاوامر المنتهيه (لخدمه العملاء)",
    description: "سجل الاوامر المكتملة ومتابعة حالة الاوامر",
    Component: CompletedOrders,
  },
  "order-receipt": {
    statusIds: [6, 7, 8, 9],
    title: "استلام الاوامر",
    description: "سجل استلام الاوامر من العملاء",
    Component: OrderReceipt,
  },
  fulfillment: {
    statusIds: [10],
    title: "استيفاء",
    description: "سجل الاستيفاء ومتابعة حالة الاوامر",
    Component: Fulfillment,
  },
  "client-fulfillment": {
    statusIds: [11],
    title: "استيفاء عميل",
    description: "سجل استيفاء العملاء ومتابعة حالة الاوامر",
    Component: ClientFulfillment,
  },
  "certificate-fulfillment": {
    statusIds: [12],
    title: "استيفاء شهادة",
    description: "سجل استيفاء الشهادات ومتابعة حالة الاوامر",
    Component: CertificateFulfillment,
  },
};

type OperationType = keyof typeof OPERATION_CONFIGS;

interface PageProps {
  params: Promise<{
    operation: string;
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

async function page({ params, searchParams }: PageProps) {
  const { operation } = await params;
  if (!(operation in OPERATION_CONFIGS)) {
    notFound();
  }
  const config = OPERATION_CONFIGS[operation as OperationType];
  const searchParameters = await searchParams;
  return (
    <PageLayout title={config.title} description={config.description}>
      <Suspense
        fallback={<TableSkeleton rows={5} columns={7} />}
        key={`${JSON.stringify(searchParameters)} - ${Object.values(config).join(",")}`}
      >
        <LoadTable config={config} searchParams={searchParameters} />
      </Suspense>
    </PageLayout>
  );
}

export default page;

async function LoadTable({
  config,
  searchParams,
}: {
  config: OperationConfig;
  searchParams: {
    search?: string;
    page?: string;
  };
}) {
  const { Component, statusIds, isCertificate } = config;
  const { items, pageNumber, totalPages } = await getOrdersByStatusIds({
    orderStatusIds: statusIds,
    IsCertificate: isCertificate,
  });
  console.log(items);

  return (
    <>
      <div className="flex">
        <div className="mr-auto">
          <ExportButton orders={items.orders} />
        </div>
      </div>
      <Component orders={items.orders} />
      <Pagination
        page={pageNumber}
        searchParams={searchParams}
        totalPages={totalPages}
      />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(OPERATION_CONFIGS).map((operation) => ({
    operation,
  }));
}
