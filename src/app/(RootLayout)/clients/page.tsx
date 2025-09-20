import ClientDetails from "@/components/clients/ClientDetails";
import CustomerForm from "@/components/clients/ClientsForm";
import Dialog from "@/components/general/Dialog";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { fetchClients } from "@/lib/data/clients";
import { defaults } from "@/lib/utils";
import { Eye, Plus } from "lucide-react";
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
              <CustomerForm />
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
      <Suspense>
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
  const clients = await fetchClients({
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
            <TableCell>
              <div>
                <Dialog>
                  <Dialog.Trigger>
                    <Eye size={16} />
                  </Dialog.Trigger>
                  <Dialog.Content title="تفاصيل العميل">
                    <ClientDetails clientId={client.id} />
                  </Dialog.Content>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
      <Pagination
        total={clients?.totalRecords || 0}
        page={clients?.pageNumber || parseInt(searchParams.page || "1") || 1}
        pageSize={clients?.pageSize || defaults.pageSize}
      />
    </>
  );
}
export default page;
