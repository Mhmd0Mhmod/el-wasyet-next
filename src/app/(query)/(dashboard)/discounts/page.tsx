import DiscountDetials from "@/components/(dashboard)/discounts/detials-dialog";
import Dialog from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { getDiscounts } from "@/data/discounts";
import {
  CheckCircle,
  Edit3Icon,
  EyeIcon,
  PlusIcon,
  Trash2Icon,
  XCircle,
} from "lucide-react";

const COLUMNS = [
  { label: "كود المؤسسه", id: "id" },
  { label: "اسم المؤسسه", id: "name" },
  { label: "نسبه الخصم", id: "discountPercentage" },
  { label: "حاله الخصم", id: "isActive" },
  {
    label: "العمليات",
    id: "actions",
  },
];
function getDiscountStatus(isActive: boolean) {
  if (isActive) {
    return (
      <div className="flex items-center gap-1 text-green-500">
        <CheckCircle size={16} />
        <span>نشط</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-red-500">
      <XCircle size={16} />
      <span>غير نشط</span>
    </div>
  );
}
async function page() {
  const discounts = await getDiscounts();
  return (
    <PageLayout
      title="تخفيضات"
      description="تسجيل التخفيضات ومتابعتها"
      extra={
        <Dialog>
          <Dialog.Trigger>
            <Button>
              <PlusIcon />
              <span>إضافه خصم جديد</span>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content title="إضافه خصم جديد">
            <p>نموذج إضافه خصم جديد سيذهب هنا</p>
          </Dialog.Content>
        </Dialog>
      }
    >
      <Table
        columns={COLUMNS}
        renderData={discounts.map((discount) => (
          <TableRow key={discount.offerId}>
            <TableCell>{discount.offerId}</TableCell>
            <TableCell>{discount.companyName}</TableCell>
            <TableCell>% {discount.discountPercentage}</TableCell>
            <TableCell>{getDiscountStatus(discount.isActive)}</TableCell>
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
                <Dialog.Content
                  title={`تفاصيل الخصم - ${discount.companyName}`}
                >
                  <DiscountDetials discountId={discount.offerId} />
                </Dialog.Content>
              </Dialog>
              <Dialog>
                <Dialog.Trigger>
                  <Button
                    variant={"link"}
                    size={"icon-sm"}
                    className="cursor-pointer p-0 text-gray-500"
                  >
                    <Edit3Icon />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تعديل الخصم">
                  <p>نموذج تعديل الخصم سيذهب هنا</p>
                </Dialog.Content>
              </Dialog>
              <Dialog>
                <Dialog.Trigger>
                  <Button variant="link" className="p-0 text-red-500">
                    <Trash2Icon />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content title="تأكيد الحذف">
                  <p>هل أنت متأكد من حذف هذا الخصم؟</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">إلغاء</Button>
                    </DialogClose>
                    <Button variant="destructive">حذف</Button>
                  </div>
                </Dialog.Content>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      />
    </PageLayout>
  );
}
export default page;
