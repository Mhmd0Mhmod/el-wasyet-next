import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Select from "@/components/general/Select";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import OrderLogs from "@/components/orders/[id]/order-logs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOrders, getOrderStatuses, getServices } from "@/data/orders";
import { formatCurrency, formatDate, getOrderStatusColor } from "@/lib/helper";
import { Order } from "@/types/order";
import { ClipboardIcon, Edit3Icon, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm?: string;
    page?: string;
    ServiceIds?: string;
    OrderStatusIds?: string;
  }>;
}) {
  const searchParamsValues = await searchParams;
  const services = await getServices();
  const orderStatus = await getOrderStatuses();
  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">الاوامر</h1>
          <p className="text-gray-500">
            إدارة أوامر العملاء ومتابعة حالة الخدمات
          </p>
        </div>
        <Button>
          <Link href={"/orders/new"}>
            <Plus className="inline-block" size={16} />
            أمر جديد
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <SearchInput title="بحث .." />
        <Select
          name="ServiceIds"
          placeholder="اسم الخدمة"
          selectItems={services.map((service) => ({
            value: service.id,
            label: service.name,
          }))}
          multiple
        />
        <Select
          name="OrderStatusIds"
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
    </section>
  );
}

const ORDER_TABLE_COLUMNS = [
  { id: "orderCode", label: "رقم الامر" },
  { id: "serviceName", label: "الخدمة" },
  { id: "clientName", label: "العميل" },
  { id: "clientPhoneNumber", label: "رقم هاتف العميل" },
  { id: "orderDate", label: "تاريخ الامر" },
  { id: "orderStatus", label: "حاله الامر" },
  { id: "requiredChange", label: "المطلوب تغيير" },
  { id: "amount", label: "قيمة الامر" },
  { id: "notes", label: "ملحوظات" },
  { id: "operations", label: "العمليات" },
];

async function OrdersTable({
  searchParams,
}: {
  searchParams: {
    searchTerm?: string;
    page?: string;
    ServiceIds?: string;
    OrderStatusIds?: string;
  };
}) {
  const { items, pageNumber, totalPages } = await getOrders({
    searchParams,
  });

  const renderOrderRows = items.map((order: Order) => (
    <TableRow
      key={order.id}
      className={getOrderStatusColor(order.recevingStatues)}
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
      <TableCell>{order.requiredChange}</TableCell>
      <TableCell>{formatCurrency(order.amount)}</TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger>
            {order.notes?.length > 0 ? (
              <span className="text-primary underline">عرض الملاحظات</span>
            ) : (
              "لا توجد ملاحظات"
            )}
          </PopoverTrigger>
          <PopoverContent>{order.notes}</PopoverContent>
        </Popover>
      </TableCell>
      <TableCell className="space-x-2">
        <Button variant="ghost" size="icon">
          <Link href={`/orders/${order.id}/edit`}>
            <Edit3Icon className="inline-block" size={16} />
          </Link>
        </Button>
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
            تم الاستلام قبل عتبة الخدمة
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-yellow-200 bg-yellow-50 text-yellow-800"
          >
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            تم الاستلام متأخرًا
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-gray-200 bg-gray-50 text-gray-800"
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            لم يتم الاستلام
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-red-200 bg-red-50 text-red-800"
          >
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            لم يتم الاستلام وتجاوز فترة الصلاحية
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

export default page;
