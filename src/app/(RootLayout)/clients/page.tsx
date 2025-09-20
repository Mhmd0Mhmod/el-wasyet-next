import CustomerForm from "@/components/clients/ClientsForm";
import ClientsTable from "@/components/clients/ClientsTable";
import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";
import { fetchClients } from "@/lib/data/clients";
import { Plus } from "lucide-react";
import { Suspense } from "react";

function page() {
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
        <ClientsTableData />
      </Suspense>
    </section>
  );
}

async function ClientsTableData() {
  const clients = await fetchClients();

  return <ClientsTable clients={clients} />;
}
export default page;
