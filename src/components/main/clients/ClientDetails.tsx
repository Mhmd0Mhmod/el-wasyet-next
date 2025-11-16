"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, User } from "lucide-react";

import Error from "@/app/(query)/(main)/error";
import Loading from "@/app/(query)/loading";
import ClientPagination from "@/components/shared/ClientPagination";
import Dialog from "@/components/shared/Dialog";
import Table from "@/components/shared/Table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClient } from "@/hooks/useClient";
import { formatDate, formatCurrency } from "@/lib/helper";
import type { Client } from "@/types/client";
import type { OrderByStatusShortOrder } from "@/types/order";

import AddBranchClient from "./AddBranchClient";
import ConvertToMainClientButton from "./ConvertToMainClientButton";
import { toast } from "sonner";
import { updateClient } from "@/actions/clients/actions";
import { BranchClientValues } from "@/schema/client";
import { cn } from "@/lib/utils";

interface ClientDetailsProps {
  clientId: number;
}
const ORDER_COLUMNS = [
  { id: "orderId", label: "رقم الأمر" },
  { id: "serviceName", label: "الخدمة" },
  { id: "createdAt", label: "تاريخ الأمر" },
  { id: "orderStatue", label: "حالة الأمر" },
  { id: "requiredChange", label: "المطلوب" },
  { id: "amount", label: "قيمة الأمر" },
  { id: "note", label: "ملاحظات" },
];

function ClientDetails({ clientId }: ClientDetailsProps) {
  const [id, setId] = useState(clientId);
  const [page, setPage] = useState(1);
  const { client, isLoading, error, refetch } = useClient(id, page);

  const handleClientChange = useCallback((newId: number) => {
    setId(newId);
    setPage(1);
  }, []);

  const handleAddBranchClient = useCallback(
    async (data: BranchClientValues) => {
      if (!client) return;
      const toastId = toast.loading("جاري إضافة العميل الفرعي...");
      try {
        const response = await updateClient({
          id: client.id,
          name: client.name,
          phone1: client.phone1,
          phone2: client.phone2 ?? undefined,
          address: client.address,
          email: client.email,
          childClients: [data],
          updateClientChildDTOs: client.childClients,
        });

        if (response.success) {
          toast.success("تم إضافة العميل الفرعي بنجاح", { id: toastId });
          refetch();
        } else {
          toast.error(response.message || "فشل في إضافة العميل الفرعي", {
            id: toastId,
          });
        }
      } catch {
        toast.error("حدث خطأ أثناء إضافة العميل الفرعي", { id: toastId });
      }
    },
    [client, refetch],
  );

  const clientType = useMemo(
    () => ({
      isMainClient: !client?.parentClient,
      isBranchClient: !!client?.parentClient,
    }),
    [client?.parentClient],
  );

  const orderRows = useMemo(
    () =>
      client?.orders.items.map((order) => (
        <OrderRow key={order.orderId} order={order} />
      )) ?? [],
    [client?.orders.items],
  );

  if (isLoading) {
    return (
      <ScrollArea dir="rtl" className="max-h-[70vh]">
        <Loading />
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <div className="relative max-h-[60vh] overflow-auto">
        <Error error={error} reset={refetch} />
      </div>
    );
  }

  if (!client) notFound();
  return (
    <>
      <ClientInfoCard
        client={client}
        clientType={clientType}
        onClientChange={handleClientChange}
        onAddBranchClient={handleAddBranchClient}
      />

      <Table columns={ORDER_COLUMNS} renderData={orderRows} />

      <ClientPagination
        totalPages={client.orders.totalPages}
        hasNextPage={client.orders.hasNextPage}
        hasPreviousPage={client.orders.hasPreviousPage}
        pageNumber={page}
        setPageNumber={setPage}
      />
    </>
  );
}

type ClientType = Client & {
  parentClient: Client | null;
  childClients: Client[];
};

interface ClientInfoCardProps {
  client: ClientType;
  clientType: { isMainClient: boolean; isBranchClient: boolean };
  onClientChange: (newId: number) => void;
  onAddBranchClient: (data: BranchClientValues) => void;
}

function ClientInfoCard({
  client,
  clientType,
  onClientChange,
  onAddBranchClient,
}: ClientInfoCardProps) {
  const { isMainClient, isBranchClient } = clientType;

  return (
    <Card>
      <CardHeader className="flex flex-col justify-between sm:flex-row">
        <CardTitle className="text-2xl">
          <User className="mr-2 inline" /> {client.name}
        </CardTitle>
        <Badge
          variant={isMainClient ? "outline" : "secondary"}
          className="mr-auto bg-green-100 text-lg text-green-700"
        >
          {isMainClient
            ? `عميل رئيسي${client.isFromApp ? " (App User)" : ""}`
            : "عميل فرعي"}
        </Badge>
      </CardHeader>

      <CardContent
        className={cn({
          "grid grid-cols-1 gap-6 md:grid-cols-2": isBranchClient,
          "grid grid-cols-1 gap-6 md:grid-cols-3": !isBranchClient,
        })}
      >
        <InfoSection
          title="تاريخ فتح الحساب"
          value={formatDate(client.createdDate, "datetime")}
        />
        <InfoSection
          title="البريد الإلكتروني"
          value={client.email || "غير متوفر"}
        />
        <ContactSection
          phone1={client.phone1}
          phone2={client.phone2}
          address={client.address}
        />
        {isBranchClient && client.parentClient && (
          <ParentClientCard parentClient={client.parentClient} />
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {isMainClient ? (
          <ChildClientsSelect
            childClients={client.childClients}
            onClientChange={onClientChange}
          />
        ) : (
          <ConvertToMainClientButton clientId={client.id} />
        )}
        <Separator
          orientation="vertical"
          className="hidden bg-transparent md:block"
        />
        <AddBranchClientDialog onSubmit={onAddBranchClient} />
      </CardFooter>
    </Card>
  );
}

function InfoSection({ title, value }: { title: string; value: string }) {
  return (
    <div className="space-y-2 text-right">
      <div className="text-muted-foreground text-sm">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function ContactSection({
  phone1,
  phone2,
  address,
}: {
  phone1: string;
  phone2?: string | null;
  address: string;
}) {
  return (
    <div className="space-y-4">
      <div className="text-right">
        <div className="text-muted-foreground mb-1 text-sm">رقم الهاتف</div>
        <div className="font-medium">{phone1}</div>
        {phone2 && <div className="font-medium">{phone2}</div>}
      </div>
      <div className="text-right">
        <div className="text-muted-foreground mb-1 text-sm">العنوان</div>
        <div className="font-medium">{address || "غير متوفر"}</div>
      </div>
    </div>
  );
}

function ParentClientCard({ parentClient }: { parentClient: Client }) {
  return (
    <Card className="bg-green-100 text-green-700">
      <CardHeader className="flex justify-between">
        <CardTitle>{parentClient.name}</CardTitle>
        <Badge className="bg-green-200 text-xs text-green-700">
          <User />
          العميل الرئيسي
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <DetailRow label="العنوان" value={parentClient.address} />
        <DetailRow label="البريد الإلكتروني" value={parentClient.email} />
        <DetailRow
          label="تاريخ فتح الحساب"
          value={formatDate(parentClient.createdDate, "datetime")}
        />
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <h4 className="font-semibold">{label}:</h4>
      <div className="font-medium">{value || "غير متوفر"}</div>
    </div>
  );
}

function ChildClientsSelect({
  childClients,
  onClientChange,
}: {
  childClients: Client[];
  onClientChange: (id: number) => void;
}) {
  return (
    <Select onValueChange={(value) => onClientChange(Number(value))}>
      <SelectTrigger dir="rtl" className="w-full">
        <SelectValue placeholder="العملاء الفرعيين" />
      </SelectTrigger>
      <SelectContent>
        {childClients.length === 0 ? (
          <div className="text-muted-foreground p-4 text-center text-sm">
            لا يوجد عملاء فرعيين
          </div>
        ) : (
          childClients.map((child) => (
            <SelectItem key={child.id} value={child.id.toString()}>
              {child.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

function AddBranchClientDialog({
  onSubmit,
}: {
  onSubmit: (data: BranchClientValues) => void;
}) {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button className="w-full">
          <Plus className="ml-2" />
          إضافة عميل فرعي
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="إضافة عميل فرعي">
        <div className="max-h-[70vh] overflow-auto">
          <AddBranchClient onSubmit={onSubmit} />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

function OrderRow({ order }: { order: OrderByStatusShortOrder }) {
  return (
    <TableRow>
      <TableCell>
        <Link href={`/orders/${order.orderId}`}>
          <Button variant="link">{order.orderId}</Button>
        </Link>
      </TableCell>
      <TableCell>{order.serviceName}</TableCell>
      <TableCell className="whitespace-nowrap">
        {formatDate(order.createdAt, "datetime")}
      </TableCell>
      <TableCell>{order.orderStatue}</TableCell>
      <TableCell>{order.requiredChange}</TableCell>
      <TableCell>{formatCurrency(order.amount)}</TableCell>
      <TableCell>
        {order.note?.length > 0 ? (
          <Popover>
            <PopoverTrigger className="text-primary underline">
              عرض الملاحظات
            </PopoverTrigger>
            <PopoverContent>{order.note}</PopoverContent>
          </Popover>
        ) : (
          "لا توجد ملاحظات"
        )}
      </TableCell>
    </TableRow>
  );
}

export default ClientDetails;
