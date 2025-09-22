"use client";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchClientById } from "@/lib/data/clients";
import { Client } from "@/types/client";
import { orderColumns } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { Building2, Edit, Eye, Plus, Trash2, User, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { useRef } from "react";
import Table from "../general/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TableCell, TableRow } from "../ui/table";
import { Separator } from "../ui/separator";

function ClientDetails({ clientId }: { clientId: number }) {
  const id = useRef(clientId);
  const {
    data: client,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Client>({
    queryKey: ["client", id],
    queryFn: () => fetchClientById(id.current),
    enabled: !!id,
  });
  if (isLoading)
    return (
      <ScrollArea dir="rtl" className="max-h-[70vh]">
        <Loading />
      </ScrollArea>
    );
  if (isError)
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
  const isMainClient = !client.parentClient;
  const isBranchClient = !!client.parentClient;
  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl">
            <User className="mr-2 inline" /> {client.name}
          </CardTitle>
          <Badge
            variant={isMainClient ? "default" : "secondary"}
            className="text-lg"
          >
            {isMainClient ? "عميل رئيسي" : "عميل فرعي"}
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <div className="col-span-1 mt-4 md:col-span-2">
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Building2 className="mr-2 h-5 w-5" />
                    العميل الرئيسي
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {client.parentClient.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                      <div className="font-medium">
                        {client.parentClient.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {client.parentClient.email}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {client.parentClient.phone1}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              variant="outline"
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
          <Button>
            <Plus className="ml-2" />
            إضافة عميل متفرع
          </Button>
        </CardFooter>
      </Card>
      <ScrollArea dir="rtl">
        <Table
          columns={orderColumns}
          renderData={client.orders.map((order) => (
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
              <TableCell>{order.note}</TableCell>
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default ClientDetails;
