import Pagination from "@/components/general/Pagination";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ExportButton from "@/components/operation/actions/ExportButton";
import CertificatesTable from "@/components/operation/tables/CertificatesTable";
import OrderReceiptTable from "@/components/operation/tables/OrderReceiptTable";
import OrdersTable from "@/components/operation/tables/OrdersTable";
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
    Component: OrdersTable,
  },
  "pending-certificates": {
    statusIds: [1],
    isCertificate: true,
    title: "الشهادات المعلقة",
    description: "سجل الشهادات المعلقة ومتابعة حالتها",
    Component: CertificatesTable,
  },
  "new-certificates": {
    statusIds: [2],
    title: "الشهادات الجديدة",
    isCertificate: true,
    description: "سجل الشهادات الجديدة ومتابعة حالتها",
    Component: CertificatesTable,
  },
  "new-orders": {
    statusIds: [2],
    title: "الاوامر الجديده",
    description: "سجل الاوامر االجديده ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  collected: {
    statusIds: [3],
    title: "تم التحصيل",
    description: "سجل تم التحصيل ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  "in-progress": {
    statusIds: [4],
    title: "تحت التنفيذ",
    description: "سجل الاوامر قيد التنفيذ ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  "completed-orders": {
    statusIds: [5],
    title: "الاوامر المنتهيه (لخدمه العملاء)",
    description: "سجل الاوامر المكتملة ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  "order-receipt": {
    statusIds: [6, 7, 8, 9],
    title: "استلام الاوامر",
    description: "سجل استلام الاوامر من العملاء",
    Component: OrderReceiptTable,
  },
  fulfillment: {
    statusIds: [10],
    title: "استيفاء",
    description: "سجل الاستيفاء ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  "client-fulfillment": {
    statusIds: [11],
    title: "استيفاء عميل",
    description: "سجل استيفاء العملاء ومتابعة حالة الاوامر",
    Component: OrdersTable,
  },
  "certificate-fulfillment": {
    statusIds: [12],
    title: "استيفاء شهادة",
    description: "سجل استيفاء الشهادات ومتابعة حالة الاوامر",
    Component: OrdersTable,
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
      <>
        <Suspense
          fallback={<TableSkeleton rows={5} columns={7} />}
          key={`${JSON.stringify(searchParameters)} - ${Object.values(config).join(",")}`}
        >
          <LoadTable config={config} searchParams={searchParameters} />
        </Suspense>
      </>
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
  try {
    const { Component, statusIds, isCertificate } = config;

    const result = await getOrdersByStatusIds({
      orderStatusIds: statusIds,
      IsCertificate: isCertificate || false,
      searchTerm: searchParams.search,
      pageNumber: searchParams.page ? parseInt(searchParams.page) : 1,
    });
    const { items, pageNumber, totalPages } = result;

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
  } catch (error) {
    throw error;
  }
}

export const dynamic = "force-dynamic";
