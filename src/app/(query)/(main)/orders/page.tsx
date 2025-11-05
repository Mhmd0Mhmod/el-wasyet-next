import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Select from "@/components/general/Select";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
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
import { ClipboardIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
      <TableCell>{order.clientName}</TableCell>
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
      <TableCell className="space-x-2">
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost" size="icon">
              <ClipboardIcon className="inline-block" size={16} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="سجل الامر" className="sm:max-w-fit">
            <OrderLogs order={order} />
          </Dialog.Content>
        </Dialog>

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

          {filterColors.map((color) => (
            <Link
              key={color.id}
              href={{
                query: {
                  ...searchParams,
                  colorId: color.id.toString(),
                },
              }}
            >
              <Badge
                variant="outline"
                className={`flex gap-2 border-${color.className}-200 bg-${color.className}-50 text-${color.className}-800`}
              >
                <div
                  className={`h-2 w-2 rounded-full bg-${color.className}-500`}
                ></div>

                {color.status}
              </Badge>
            </Link>
          ))}
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
  const services = await getServices();
  const orderStatus = await getOrderStatuses();
  return (
    <PageLayout
      title="الاوامر"
      description="إدارة أوامر العملاء ومتابعة حالة الخدمات"
      extra={
        <Button>
          <Link href={"/orders/new"}>
            <Plus className="inline-block" size={16} />
            أمر جديد
          </Link>
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <SearchInput title="بحث .." />
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
