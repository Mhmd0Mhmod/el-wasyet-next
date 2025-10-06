import ClientDetails from "@/components/clients/ClientDetails";
import ClientForm from "@/components/clients/ClientsForm";
import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import TableSkeleton from "@/components/general/TableSkeleton";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getClients } from "@/data/clients";
import { defaults } from "@/lib/utils";
import { Edit2, Eye, Plus } from "lucide-react";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const { search, page } = await searchParams;
  return (
    <section className="container space-y-12 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">العملاء</h1>
          <p className="text-gray-500">إدارة العملاء الرئيسين والفرعيين</p>
        </div>
        <div>
          <Dialog>
            <Dialog.Trigger>
              <Button>
                <Plus size={16} />
                إضافة عميل
              </Button>
            </Dialog.Trigger>
            <Dialog.Content title="إضافة عميل">
              <ClientForm />
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
      <Suspense
        fallback={<TableSkeleton rows={5} columns={6} />}
        key={search + (page || "")}
      >
        <ClientsTableData searchParams={{ search, page }} />
      </Suspense>
    </section>
  );
}
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
      <SearchInput title="البحث عن عميل..." />
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
                    className="container overflow-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
                  >
                    <div className="max-h-[70vh] space-y-10 overflow-auto">
                      <ClientDetails clientId={client.id} />
                    </div>
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
export default page;
