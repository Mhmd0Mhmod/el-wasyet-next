import SearchInput from "@/components/general/SearchInput";
import Select from "@/components/general/Select";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { getOrders } from "@/data/orders";
import { TableCell, TableRow } from "@/components/ui/table";
import { Suspense } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Dialog from "@/components/general/Dialog";
import { ClipboardIcon, Edit2Icon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/general/Pagination";
import { Order } from "@/types/order";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm?: string;
    page?: string;
    ServiceId?: string;
    OrderStatusIds?: string;
  }>;
}) {
  const searchParamsValues = await searchParams;
  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">الاوامر</h1>
          <p className="text-gray-500">
            إدارة أوامر العملاء ومتابعة حالة الخدمات
          </p>
        </div>
        <div>
          <Dialog>
            <Dialog.Trigger>
              <Button>
                <Plus />
                إضافة أمر
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="إضافة أمر جديد">
              <div></div>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <SearchInput title="بحث .." />
        <Select name="ServiceId" placeholder="اسم الخدمة" selectItems={[]} />
        <Select
          name="OrderStatusIds"
          placeholder="حاله الامر"
          selectItems={[]}
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
    ServiceId?: string;
    OrderStatusIds?: string;
  };
}) {
  const { items, pageNumber, pageSize, totalRecords } = await getOrders({
    searchParams,
  });

  const renderOrderRows = items.map((order: Order) => (
    <TableRow
      key={order.id}
      className={`bg-${order.recevingStatues.toLowerCase()}-200`}
    >
      <TableCell>{order.orderCode}</TableCell>
      <TableCell>{order.serviceName}</TableCell>
      <TableCell>{order.clientName}</TableCell>
      <TableCell>{order.clientPhoneNumber}</TableCell>
      <TableCell>{order.orderDate}</TableCell>
      <TableCell>{order.orderStatus}</TableCell>
      <TableCell>{order.requiredChange}</TableCell>
      <TableCell>{order.amount}</TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger>
            {order.notes.length > 0 ? "عرض الملاحظات" : "لا توجد ملاحظات"}
          </PopoverTrigger>
          <PopoverContent>{order.notes}</PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost" size={"icon"}>
              <Edit2Icon />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="تعديل الامر">
            <div></div>
          </Dialog.Content>
        </Dialog>
        <Dialog>
          <Dialog.Trigger>
            <Button variant="ghost" size={"icon"}>
              <ClipboardIcon />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="= تفاصيل الامر">
            <div></div>
          </Dialog.Content>
        </Dialog>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Table columns={ORDER_TABLE_COLUMNS} renderData={renderOrderRows} />

      {/* Order Status Legend */}
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
            تم التسليم في الموعد
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-gray-200 bg-gray-50 text-gray-800"
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            تم التسليم متأخر
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-yellow-200 bg-yellow-50 text-yellow-800"
          >
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            لم يسلم - الموعد لم يصل بعد
          </Badge>

          <Badge
            variant="outline"
            className="gap-2 border-red-200 bg-red-50 text-red-800"
          >
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            لم يسلم وتجاوز الموعد
          </Badge>
        </div>
      </div>

      <Pagination page={pageNumber} pageSize={pageSize} total={totalRecords} />
    </>
  );
}

export default page;
