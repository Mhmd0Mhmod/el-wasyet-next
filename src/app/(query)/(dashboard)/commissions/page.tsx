import Dialog from "@/components/general/Dialog";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function page() {
  return (
    <PageLayout
      title="العمولات"
      description="تسجيل ومتابعة والعمولات"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button>
              <PlusIcon />
              إضافه عموله جديده
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافه عموله جديده">
            محتوى الاضافه
          </Dialog.Content>
        </Dialog>
      }
    >
      <CommissionsTable />
    </PageLayout>
  );
}

async function CommissionsTable() {
  return <></>;
}
export default page;
