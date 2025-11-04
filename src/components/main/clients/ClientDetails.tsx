"use client";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useClient } from "@/hooks/useClient";
import { Edit, Eye, Plus, Trash2, User, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { useRef } from "react";
import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import AddBranchClient from "./AddBranchClient";
const orderColumns = [
  { id: "orderId", label: "رقم الأمر" },
  { id: "serviceName", label: "الخدمة" },
  { id: "createdAt", label: "تاريخ الأمر" },
  { id: "orderStatue", label: "حالة الأمر" },
  { id: "requiredChange", label: "المطلوب" },
  { id: "amount", label: "قيمة الأمر" },
  { id: "note", label: "ملاحظات" },
  { id: "actions", label: "العمليات" },
];

function ClientDetails({ clientId }: { clientId: number }) {
  const id = useRef(clientId);
  const page = useRef(1);
  const { client, isLoading, error, refetch } = useClient(id.current);
  if (isLoading)
    return (
      <ScrollArea dir="rtl" className="max-h-[70vh]">
        <Loading />
      </ScrollArea>
    );
  if (error)
    return (
      <div className="relative max-h-[60vh] overflow-auto">
        <Error error={error} reset={refetch} />
      </div>
    );
  if (!client) notFound();
  function setId(newId: number) {
    id.current = newId;
    refetch();
  }
  function movePrev() {
    if (page.current > 1) {
      page.current -= 1;
      refetch();
    }
  }
  function moveNext() {
    if (client && page.current < client.orders.totalPages) {
      page.current += 1;
      refetch();
    }
  }
  function goToPage(pageNumber: number) {
    if (client && pageNumber >= 1 && pageNumber <= client.orders.totalPages) {
      page.current = pageNumber;
      refetch();
    }
  }
  function onAddBranchClient() {
    // TODO: Implement add branch client functionality
  }
  const isMainClient = !client.parentClient;
  const isBranchClient = !!client.parentClient;
  return (
    <>
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
              ? `عميل رئيسي ${client.isFromApp ? "(App User)" : ""}    `
              : "عميل فرعي"}
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-4">
            <div className="text-right">
              <div className="text-muted-foreground text-sm">
                تاريخ فتح الحساب
              </div>
              <div className="font-medium">
                {Intl.DateTimeFormat("ar-EG", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(client.createdDate))}
              </div>
            </div>

            <div className="text-right">
              <div className="text-muted-foreground mb-1 text-sm">
                البريد الإلكتروني
              </div>
              <div className="font-medium">{client.email}</div>
            </div>
          </div>

          {/* Left Column - Contact Info */}
          <div className="space-y-4">
            <div className="text-right">
              <div className="text-muted-foreground mb-1 text-sm">
                رقم الهاتف
              </div>
              <div className="font-medium">{client.phone1}</div>
              {client.phone2 && (
                <div className="font-medium">{client.phone2}</div>
              )}
            </div>

            <div className="text-right">
              <div className="text-muted-foreground mb-1 text-sm">العنوان</div>
              <div className="font-medium">{client.address}</div>
            </div>
          </div>
          {/* Parent Client Info */}
          {isBranchClient && client.parentClient && (
            <Card className="bg-green-100 text-green-700">
              <CardHeader className="flex justify-between">
                <CardTitle>{client.parentClient.name}</CardTitle>
                <Badge className="bg-green-200 text-xs text-green-700">
                  <User />
                  العميل الرئيسي
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <h4>العنوان :</h4>
                  <div className="font-medium">
                    {client.parentClient.address}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <h4>البريد الإلكتروني :</h4>
                  <div className="font-medium">{client.parentClient.email}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <h4>تاريخ فتح الحساب :</h4>
                  <div className="font-medium">
                    {Intl.DateTimeFormat("ar-EG", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(client.parentClient.createdDate))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {isMainClient ? (
            <Select onValueChange={(value) => setId(Number(value))}>
              <SelectTrigger dir="rtl" className="w-full">
                <SelectValue placeholder="العملاء الفرعيين" />
              </SelectTrigger>
              <SelectContent>
                {client.childClients.length === 0 && (
                  <div className="text-muted-foreground p-4 text-center text-sm">
                    لا يوجد عملاء فرعيين
                  </div>
                )}
                {client.childClients.map((child) => (
                  <SelectItem key={child.id} value={child.id.toString()}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Button
              variant="default"
              className="w-full bg-green-100 text-green-700 hover:bg-green-200"
              onClick={() => setId(client.parentClient!.id)}
            >
              <Users className="ml-2" />
              عرض العميل الرئيسي
            </Button>
          )}
          <Separator
            orientation="vertical"
            className="hidden bg-transparent md:block"
          />
          <Dialog>
            <Dialog.Trigger>
              <Button className="w-full">
                <Plus className="ml-2" />
                إضافة عميل فرعي
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="إضافة عميل فرعي">
              <div className="max-h-[70vh] overflow-auto">
                <AddBranchClient onSubmit={() => onAddBranchClient()} />
              </div>
            </Dialog.Content>
          </Dialog>
        </CardFooter>
      </Card>

      <Table
        columns={orderColumns}
        renderData={client.orders.items.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.serviceName}</TableCell>
            <TableCell className="whitespace-wrap">
              {Intl.DateTimeFormat("ar-EG", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(order.createdAt))}
            </TableCell>
            <TableCell>{order.orderStatue}</TableCell>
            <TableCell>{order.requiredChange}</TableCell>
            <TableCell>
              {Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
              }).format(order.amount)}
            </TableCell>
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
            <TableCell>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
      {client.orders.totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={movePrev} />
            </PaginationItem>
            {client.orders.pageNumber > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {Array.from({ length: client.orders.totalPages }).map(
              (_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => {
                    goToPage(index + 1);
                  }}
                >
                  <PaginationLink isActive={page.current === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            {client.orders.pageNumber < client.orders.totalPages - 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext onClick={moveNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default ClientDetails;
