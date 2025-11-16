import ClientDetails from "@/components/main/clients/ClientDetails";
import ClientForm from "@/components/main/clients/ClientsForm";
import Dialog from "@/components/shared/Dialog";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import Table from "@/components/shared/Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getClients } from "@/data/clients";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";
import ExportButton from "@/components/shared/export-button";

const columns = [
  { id: "name", label: "الاسم" },
  { id: "address", label: "العنوان" },
  { id: "phone1", label: "رقم الهاتف " },
  { id: "email", label: "البريد الإلكتروني" },
  { id: "createdDate", label: "تاريخ فتح الحساب" },
  { id: "actions", label: "إجراءات" },
];
async function ClientsTableData({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
  };
}) {
  const clients = await getClients({
    search: searchParams.search,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  });
  return (
    <>
      <Table
        columns={columns}
        renderData={clients?.items.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.address}</TableCell>
            <TableCell>{client.phone1}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>
              {new Date(client.createdDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex items-center gap-4">
              <>
                <Dialog>
                  <Dialog.Trigger>
                    <Eye size={16} />
                  </Dialog.Trigger>
                  <Dialog.Content
                    title="تفاصيل العميل"
                    className="container max-h-[80vh] overflow-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
                  >
                    <ClientDetails clientId={client.id} />
                  </Dialog.Content>
                </Dialog>
                <Dialog>
                  <Dialog.Trigger>
                    <Edit2 size={16} />
                  </Dialog.Trigger>
                  <Dialog.Content title="تفاصيل العميل">
                    <ClientForm clientId={client.id} />
                  </Dialog.Content>
                </Dialog>
              </>
            </TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        totalPages={clients?.totalPages || 0}
        page={clients?.pageNumber || parseInt(searchParams.page || "1") || 1}
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
  }>;
}) {
  const params = await searchParams;
  return (
    <PageLayout
      title="العملاء"
      description="إدارة العملاء الرئيسين والفرعيين"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button className="w-full sm:w-auto">
              <Plus size={16} />
              إضافة عميل
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافة عميل">
            <ClientForm />
          </Dialog.Content>
        </Dialog>
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <SearchInput title="البحث عن عميل..." />
        <ExportButton url="Client/export/excel" params={params} />
      </div>
      <Suspense
        fallback={<TableSkeleton rows={5} columns={6} />}
        key={JSON.stringify(params)}
      >
        <ClientsTableData searchParams={params} />
      </Suspense>
    </PageLayout>
  );
}
export default page;
