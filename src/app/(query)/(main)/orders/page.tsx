import Dialog from "@/components/shared/Dialog";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import Select from "@/components/shared/Select";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import OrderLogs from "@/components/main/orders/[id]/order-logs";
import OrderTableDropDownMenu from "@/components/main/orders/OrderTableDropDownMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOrders, getOrderStatuses, getServices } from "@/data/orders";
import { formatCurrency, formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { ClipboardIcon, Edit3, Plus, X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ExportButton from "@/components/shared/export-button";
import ClientDetails from "@/components/main/clients/ClientDetails";
import { checkAccess } from "@/actions/auth/actions";
import { ABILITY_IDS } from "@/constants/abilities";

const ORDER_TABLE_COLUMNS = [
  { id: "orderCode", label: "رقم الامر" },
  { id: "serviceName", label: "الخدمة" },
  { id: "clientName", label: "العميل" },
  { id: "clientPhoneNumber", label: "رقم هاتف العميل" },
  { id: "orderDate", label: "تاريخ الامر" },
  { id: "orderStatus", label: "حاله الامر" },
  { id: "requiredChange", label: "المطلوب تغيير" },
  { id: "amount", label: "قيمة الامر" },
  { id: "notes", label: "ملاحظات" },
  { id: "operations", label: "العمليات" },
];

async function OrdersTable({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
    serviceIds?: string;
    orderStatusIds?: string;
    colorId?: string;
  };
}) {
  const { items, pageNumber, totalPages } = await getOrders({
    searchParams,
  });
  const canEdit = await checkAccess(ABILITY_IDS.UPDATE_ORDER);

  const renderOrderRows = items.map((order: Order) => (
    <TableRow
      key={order.id}
      className={cn(
        "hover:bg-muted",
        `bg-${order.recevingStatues.toLowerCase()}-100`,
      )}
    >
      <TableCell className="text-center">
        <Link href={`/orders/${order.id}`} className="underline">
          {order.orderCode}
        </Link>
      </TableCell>
      <TableCell>{order.serviceName}</TableCell>
      <TableCell>
        <Dialog>
          <Dialog.Trigger>
            <Button className="cursor-pointer p-0" variant={"link"}>
              {order.clientName}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content
            title="تفاصيل العميل"
            className="container sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
          >
            <div className="max-h-[70vh] space-y-10 overflow-auto">
              <ClientDetails clientId={order.clientId} />
            </div>
          </Dialog.Content>
        </Dialog>
      </TableCell>
      <TableCell>{order.clientPhoneNumber}</TableCell>
      <TableCell>{formatDate(order.orderDate, "datetime")}</TableCell>
      <TableCell>{order.orderStatus}</TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger disabled={!order.requiredChange}>
            {order.requiredChange?.length > 0 ? (
              <span className="text-primary underline">عرض التغييرات</span>
            ) : (
              "لا توجد تغييرات"
            )}
          </PopoverTrigger>
          <PopoverContent>{order.requiredChange}</PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>{formatCurrency(order.amount)}</TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger>
            {order?.notes?.length > 0 ? (
              <span className="text-primary underline">عرض الملاحظات</span>
            ) : (
              "لا توجد ملاحظات"
            )}
          </PopoverTrigger>
          <PopoverContent>{order.notes}</PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost" size="icon-sm">
              <ClipboardIcon className="inline-block" size={12} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="سجل الامر" className="sm:max-w-fit">
            <OrderLogs order={order} />
          </Dialog.Content>
        </Dialog>
        {canEdit && (
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href={`/orders/${order.id}/edit`}>
              <Edit3 className="inline-block" size={12} />
            </Link>
          </Button>
        )}
        <OrderTableDropDownMenu order={order} />
      </TableCell>
    </TableRow>
  ));

  const filterColors = [
    {
      status: "تم الاستلام قبل انتهاء فترة الخدمة",
      className: "green",
      id: 1,
    },
    {
      status: "تم الاستلام بعد انتهاء فترة الخدمة",
      className: "yellow",
      id: 2,
    },
    {
      status: "لم يتم الاستلام ولكن لم تنتهي مده الخدمة",
      className: "gray",
      id: 3,
    },
    {
      status: "لم يتم الاستلام وتجاوز فترة الخدمة",
      className: "red",
      id: 4,
    },
  ];

  return (
    <>
      <Table columns={ORDER_TABLE_COLUMNS} renderData={renderOrderRows} />
      <div className="bg-muted/30 border-t p-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="text-foreground font-medium">
            حالة تسليم الطلبيات:
          </span>

          {filterColors.map((color) => {
            const isSelected = searchParams.colorId === color.id.toString();
            const query = new URLSearchParams(
              searchParams as Record<string, string>,
            );
            if (isSelected) {
              query.delete("colorId");
            } else {
              query.set("colorId", color.id.toString());
            }
            return (
              <Link key={color.id} href={`?${query.toString()}`}>
                <Badge
                  variant="outline"
                  className={`flex gap-2 border-${color.className}-200 bg-${color.className}-50 text-${color.className}-800`}
                >
                  <div
                    className={`h-2 w-2 rounded-full bg-${color.className}-500 flex items-center justify-center`}
                  >
                    {isSelected ? <X size={12} /> : null}
                  </div>

                  {color.status}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>

      <Pagination
        page={pageNumber}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </>
  );
}
async function page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    serviceIds?: string;
    orderStatusIds?: string;
  }>;
}) {
  const searchParamsValues = await searchParams;
  const canCreate = await checkAccess(ABILITY_IDS.CREATE_ORDER);
  const services = await getServices();
  const orderStatus = await getOrderStatuses();
  return (
    <PageLayout
      title="الاوامر"
      description="إدارة أوامر العملاء ومتابعة حالة الخدمات"
      extra={
        canCreate && (
          <Button>
            <Link href={"/orders/new"}>
              <Plus className="inline-block" size={16} />
              أمر جديد
            </Link>
          </Button>
        )
      }
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="w-full sm:w-auto sm:min-w-[200px] sm:flex-1">
          <SearchInput title="بحث .." />
        </div>
        <Select
          name="serviceIds"
          placeholder="اسم الخدمة"
          selectItems={services.map((service) => ({
            value: service.id,
            label: service.name,
          }))}
          multiple
        />

        <Select
          name="orderStatusIds"
          placeholder="حاله الامر"
          selectItems={orderStatus.map((status) => ({
            value: status.id,
            label: status.name,
          }))}
          multiple
        />
        <div className="w-full sm:mr-auto sm:w-auto">
          <ExportButton url="Order/export/excel" params={searchParamsValues} />
        </div>
      </div>
      <Suspense
        fallback={<TableSkeleton rows={5} columns={5} />}
        key={Object.values(searchParamsValues).join("-")}
      >
        <OrdersTable searchParams={searchParamsValues} />
      </Suspense>
    </PageLayout>
  );
}
export default page;
