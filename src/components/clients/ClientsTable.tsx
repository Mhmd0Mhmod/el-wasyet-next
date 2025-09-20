"use client";
import { fetchClients } from "@/lib/data/clients";
import { useQuery } from "@tanstack/react-query";
import { Eye, SearchIcon } from "lucide-react";
import { useState } from "react";
import Input from "../general/Input";
import Table from "../general/Table";
import { TableCell, TableRow } from "../ui/table";
import Dialog from "../general/Dialog";
import ClientDetails from "./ClientDetails";

const columns = [
  { id: "name", label: "الاسم" },
  { id: "address", label: "العنوان" },
  { id: "phone1", label: "رقم الهاتف " },
  { id: "email", label: "البريد الإلكتروني" },
  { id: "createdDate", label: "تاريخ فتح الحساب" },
  { id: "actions", label: "إجراءات" },
];

function ClientsTable({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data: clientsData } = useQuery({
    queryKey: ["clients", search, page],
    queryFn: () => fetchClients({ search, page }),
    initialData: clients,
  });
  return (
    <>
      <Input
        container="max-w-sm"
        Icon={SearchIcon}
        props={{
          placeholder: "بحث عن عميل...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
        }}
      />
      <Table
        columns={columns}
        renderData={clientsData?.map((client) => (
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
    </>
  );
}
export default ClientsTable;
