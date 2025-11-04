import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Select from "@/components/general/Select";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import OrderLogs from "@/components/main/orders/[id]/order-logs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ClipboardIcon, MoreVerticalIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import RefundOrderForm from "@/components/main/orders/RefundOrderForm";

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
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup dir="rtl">
                <Dialog.Trigger>
                  <DropdownMenuItem>مرتجع</DropdownMenuItem>
                </Dialog.Trigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog.Content title="مرتجع" className="sm:max-w-fit">
            <RefundOrderForm orderId={order.id} />
          </Dialog.Content>
        </Dialog>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Table columns={ORDER_TABLE_COLUMNS} renderData={renderOrderRows} />
      <div className="bg-muted/30 border-t p-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="text-foreground font-medium">
            حالة تسليم الطلبيات:
          </span>

          <Badge
            variant="outline"
            className="gap-2 border-green-200 bg-green-50 text-green-800"
          >
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            تم الاستلام قبل انتهاء فترة الخدمة
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-yellow-200 bg-yellow-50 text-yellow-800"
          >
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            تم الاستلام بعد انتهاء فترة الخدمة
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-gray-200 bg-gray-50 text-gray-800"
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            لم يتم الاستلام ولكن لم تنتهي مده الخدمة
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-red-200 bg-red-50 text-red-800"
          >
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            لم يتم الاستلام وتجاوز فترة الخدمة
          </Badge>
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
