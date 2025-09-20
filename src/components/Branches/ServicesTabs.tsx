import { Service } from "@/lib/types/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Table from "../general/Table";
import { TableCell, TableRow } from "../ui/table";

const TABSLIST = [
  { label: "رسوم إضافية", value: "overheads" },
  { label: "المستندات", value: "documents" },
  { label: "مراحل التقديم", value: "workflows" },
];

function ServicesTabs({ services }: { services: Service }) {
  return (
    <Tabs defaultValue={TABSLIST[0].value}>
      <TabsList className="mb-4 w-full border-b">
        {TABSLIST.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="workflows" dir="rtl">
        <Table
          columns={[
            { id: "id", label: "#" },
            { label: "مراحل التقديم علي الخدمهة", id: "name" },
          ]}
          renderData={services.workflows.map((workflow, index) => (
            <TableRow key={workflow.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{workflow.orderStatusName}</TableCell>
            </TableRow>
          ))}
        />
      </TabsContent>
      <TabsContent value="documents" dir="rtl">
        <Table
          columns={[{ id: "name", label: "المستندات المطلوبة" }]}
          renderData={services.documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.description}</TableCell>
            </TableRow>
          ))}
        />
      </TabsContent>
      <TabsContent value="overheads" dir="rtl">
        <Table
          columns={[
            {
              label: "الغرامة",
              id: "penalty",
            },
            {
              label: "قيمه الرسوم (+ / -)",
              id: "amount",
            },
            {
              label: "النوع",
              id: "type",
            },
          ]}
          renderData={services.overheads.map((overhead) => (
            <TableRow key={overhead.id}>
              <TableCell>{overhead.penalty ? "غرامة" : "رسوم"}</TableCell>
              <TableCell>
                {Intl.NumberFormat("ar-EG", {
                  style: "currency",
                  currency: "EGP",
                }).format(overhead.value)}
              </TableCell>
              <TableCell>{overhead.description}</TableCell>
            </TableRow>
          ))}
        />
      </TabsContent>
    </Tabs>
  );
}
export default ServicesTabs;
