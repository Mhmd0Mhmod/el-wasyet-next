import AgentDetials from "@/components/(dashboard)/agents/agent-dialog";
import AgentForm from "@/components/(dashboard)/agents/agent-form";
import DeleteAgentButton from "@/components/(dashboard)/agents/delete-agent-button";
import Dialog from "@/components/general/Dialog";
import SearchInput from "@/components/general/SearchInput";
import Table from "@/components/general/Table";
import PageLayout from "@/components/Layout/PageLayout";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getAgents } from "@/data/agents";
import {
  CheckCircle,
  Edit3Icon,
  EyeIcon,
  PlusIcon,
  Trash2,
  XCircle,
} from "lucide-react";

function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <PageLayout
      title="الوكلاء"
      description="تسجيل الخصومات ومتابعتها"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button>
              <PlusIcon />
              <span>إضافه وكيل جديد</span>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافه وكيل جديد">
            <AgentForm />
          </Dialog.Content>
        </Dialog>
      }
    >
      <SearchInput title="بحث عن وكيل" />
      <AgentsTable searchParams={searchParams} />
    </PageLayout>
  );
}
const COLUMNS = [
  { label: "كود المؤسسه", id: "id" },
  { label: "اسم المؤسسه", id: "company" },
  { label: "نسبه الزباده", id: "increase" },
  { label: "حاله الزياده", id: "status" },
  { label: "العمليات", id: "actions" },
];
function AgentStatus({ isActive }: { isActive?: boolean }) {
  if (isActive) {
    return (
      <div className="flex items-center gap-1 text-green-500">
        <CheckCircle />
        <span>مفعل</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-red-500">
      <XCircle />
      <span>غير مفعل</span>
    </div>
  );
}

async function AgentsTable({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const agents = await getAgents(search);
  return (
    <Table
      columns={COLUMNS}
      renderData={agents.map((agent) => (
        <TableRow key={agent.id}>
          <TableCell>{agent.id}</TableCell>
          <TableCell>{agent.name}</TableCell>
          <TableCell>{agent.commissionPercentage}%</TableCell>
          <TableCell>
            <AgentStatus isActive={agent.isActive || false} />
          </TableCell>
          <TableCell>
            <Dialog>
              <Dialog.Trigger>
                <Button
                  variant={"link"}
                  size={"icon-sm"}
                  className="cursor-pointer text-gray-500"
                >
                  <EyeIcon size={12} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Content title="تفاصيل الوكيل">
                <AgentDetials agentId={agent.id} />
              </Dialog.Content>
            </Dialog>
            <Dialog>
              <Dialog.Trigger>
                <Button
                  variant={"link"}
                  size={"icon-sm"}
                  className="cursor-pointer text-gray-500"
                >
                  <Edit3Icon size={12} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Content title={`تعديل الوكيل - ${agent.name}`}>
                <AgentForm agent={agent} />
              </Dialog.Content>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"link"}
                  size={"icon-sm"}
                  className="cursor-pointer text-red-500"
                >
                  <Trash2 size={12} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="sm:text-right">
                  <AlertDialogTitle>
                    هل انت متأكد من حذف هذا الوكيل؟
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <DeleteAgentButton agentId={agent.id} />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
      ))}
    />
  );
}
export default page;
