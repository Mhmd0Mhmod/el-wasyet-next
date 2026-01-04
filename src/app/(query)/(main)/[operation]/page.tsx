import Pagination from "@/components/shared/Pagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import ExportButton from "@/components/main/operation/actions/ExportButton";
import CertificatesTable from "@/components/main/operation/tables/CertificatesTable";
import OrderReceiptTable from "@/components/main/operation/tables/OrderReceiptTable";
import OrdersTable from "@/components/main/operation/tables/OrdersTable";
import { getOrdersByStatusIds, getServices } from "@/data/orders";
import { OrderByStatus } from "@/types/order";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";
import SearchInput from "@/components/shared/SearchInput";
import Select from "@/components/shared/Select";
import { Service } from "@/types/service";

export const dynamic = "force-dynamic";

interface OperationConfig {
  statusIds: number[];
  title: string;
  description: string;
  isCertificate?: boolean;
  Component: React.FC<{ orders: OrderByStatus[] }>;
  abilityId?: number;
}

const OPERATION_CONFIGS: Record<string, OperationConfig> = {
  "pending-orders": {
    statusIds: [1],
    isCertificate: false,
    title: "الاوامر المعلقه",
    description: "سجل أوامر المعلقه ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_PENDING_ORDERS,
  },
  "pending-certificates": {
    statusIds: [1],
    isCertificate: true,
    title: "الشهادات المعلقة",
    description: "سجل الشهادات المعلقة ومتابعة حالتها",
    Component: CertificatesTable,
    abilityId: ABILITY_IDS.VIEW_PENDING_CERTIFICATES,
  },
  "new-certificates": {
    statusIds: [2],
    title: "الشهادات الجديدة",
    isCertificate: true,
    description: "سجل الشهادات الجديدة ومتابعة حالتها",
    Component: ({ orders }) => (
      <>
        <CertificatesTable orders={orders} />
        <div className="flex items-center justify-end-safe gap-4">
          <div className="h-4 w-4 rounded-full border bg-yellow-100 text-sm font-medium" />
          <span>الاوامر لها طلب تحصيل بالفعل</span>
        </div>
      </>
    ),
    abilityId: ABILITY_IDS.VIEW_NEW_CERTIFICATES,
  },
  "new-orders": {
    statusIds: [2],
    isCertificate: false,
    title: "الاوامر الجديده",
    description: "سجل الاوامر االجديده ومتابعة حالة الاوامر",
    Component: ({ orders }) => (
      <>
        <OrdersTable orders={orders} />
        <div className="flex items-center justify-end-safe gap-4">
          <div className="h-4 w-4 rounded-full border bg-yellow-100 text-sm font-medium" />
          <span>الاوامر لها طلب تحصيل بالفعل</span>
        </div>
      </>
    ),
    abilityId: ABILITY_IDS.VIEW_NEW_ORDERS,
  },
  collected: {
    statusIds: [3],
    title: "تم التحصيل",
    description: "سجل تم التحصيل ومتابعة حالة الاوامر",
    Component: ({ orders }) => (
      <>
        <OrdersTable orders={orders} />
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center justify-end-safe gap-4">
            <div className="h-4 w-4 rounded-full border bg-gray-400 text-sm font-medium" />
            <span>استيفاء عميل</span>
          </div>
          <div className="flex items-center justify-end-safe gap-4">
            <div className="h-4 w-4 rounded-full border bg-purple-500 text-sm font-medium" />
            <span>استيفاء</span>
          </div>
          <div className="flex items-center justify-end-safe gap-4">
            <div className="h-4 w-4 rounded-full border bg-orange-700 text-sm font-medium" />
            <span>استيفاء شهادة</span>
          </div>
        </div>
      </>
    ),
    abilityId: ABILITY_IDS.VIEW_COLLECTED,
  },
  "in-progress": {
    statusIds: [4],
    title: "تحت التنفيذ",
    description: "سجل الاوامر قيد التنفيذ ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_IN_PROGRESS,
  },
  "completed-orders": {
    statusIds: [5],
    title: "الاوامر المنتهيه (لخدمه العملاء)",
    description: "سجل الاوامر المكتملة ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_COMPLETED_ORDERS,
  },
  "order-receipt": {
    statusIds: [6],
    title: "استلام الاوامر",
    description: "سجل استلام الاوامر من العملاء",
    Component: OrderReceiptTable,
    abilityId: ABILITY_IDS.VIEW_ORDER_RECEIPT,
  },
  fulfillment: {
    statusIds: [11],
    title: "استيفاء",
    description: "سجل الاستيفاء ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_FULFILLMENT,
  },
  "client-fulfillment": {
    statusIds: [10],
    title: "استيفاء عميل",
    description: "سجل استيفاء العملاء ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_CLIENT_FULFILLMENT,
  },
  "certificate-fulfillment": {
    statusIds: [12],
    title: "استيفاء شهادة",
    description: "سجل استيفاء الشهادات ومتابعة حالة الاوامر",
    Component: OrdersTable,
    abilityId: ABILITY_IDS.VIEW_CERTIFICATE_FULFILLMENT,
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
    serviceId?: string;
  }>;
}

async function page({ params, searchParams }: PageProps) {
  const { operation } = await params;
  if (!(operation in OPERATION_CONFIGS)) {
    notFound();
  }
  const config = OPERATION_CONFIGS[operation as OperationType];

  if (config.abilityId) {
    const canView = await checkAccess(config.abilityId);
    if (!canView) {
      return (
        <PageLayout title={config.title} description={config.description}>
          <div className="text-center text-gray-500">
            ليس لديك صلاحية لعرض هذه الصفحة
          </div>
        </PageLayout>
      );
    }
  }
  const services = await getServices();

  const searchParameters = await searchParams;
  return (
    <PageLayout title={config.title} description={config.description}>
      <>
        <Suspense
          fallback={<TableSkeleton rows={5} columns={7} />}
          key={`${JSON.stringify(searchParameters)} - ${Object.values(config).join(",")}`}
        >
          <LoadTable
            config={config}
            searchParams={searchParameters}
            services={services}
          />
        </Suspense>
      </>
    </PageLayout>
  );
}

export default page;

async function LoadTable({
  config,
  searchParams,
  services,
}: {
  config: OperationConfig;
  searchParams: {
    search?: string;
    page?: string;
    serviceId?: string;
  };
  services: Service[];
}) {
  try {
    const { Component, statusIds, isCertificate } = config;

    const result = await getOrdersByStatusIds({
      orderStatusIds: statusIds,
      IsCertificate: isCertificate,
      searchTerm: searchParams.search,
      pageNumber: searchParams.page ? parseInt(searchParams.page) : 1,
      serviceId: searchParams.serviceId,
    });
    const { items, pageNumber, totalPages } = result;
    console.log(items);

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchInput title="بحث" />
            <Select
              name="serviceId"
              value={searchParams.serviceId || ""}
              placeholder="تصفيه بالخدمه"
              selectItems={services.map((service) => ({
                value: service.id.toString(),
                label: service.name,
              }))}
            />
          </div>
          <div className="mr-auto">
            <ExportButton
              params={{
                ...searchParams,
                orderStatusIds: statusIds,
                IsCertificate: isCertificate,
              }}
              name={config.title}
            />
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
