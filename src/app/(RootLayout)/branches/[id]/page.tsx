import BranchInfoItem from "@/components/Branches/BranchInfoItem";
import LastActivities from "@/components/Branches/LastActivities";
import NewBranchButton from "@/components/Branches/NewBranch";
import ServicesTable from "@/components/Branches/ServicesTable";
import { TabsList, TabsTrigger } from "@/components/general/Tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { getBranchById } from "@/lib/data/branches";
import { CheckCircle, Clock, Edit2, MapPin, Phone, User } from "lucide-react";
import { notFound } from "next/navigation";

async function BranchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const branch = await getBranchById(id);

  if (!branch) {
    notFound();
  }

  return (
    <section className="container space-y-12 pt-6">
      {/* Page Header */}
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">فرع {branch.name}</h1>
          <p className="text-gray-500">تفاصيل واداره الفرع</p>
        </div>
        <div>
          <NewBranchButton
            branch={branch}
            Trigger={() => (
              <Button>
                <Edit2 />
                تعديل الفرع
              </Button>
            )}
          />
        </div>
      </div>

      {/* Branch Information Card */}
      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-2xl">معلومات الفرع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <BranchInfoItem
              icon={<MapPin className="h-6 w-6 text-gray-600" />}
              title="العنوان"
              value={branch.address}
            />
            <BranchInfoItem
              icon={<User className="h-6 w-6 text-gray-600" />}
              title="مدير الفرع"
              value={branch.managerName}
            />
            <BranchInfoItem
              icon={<Clock className="h-6 w-6 text-gray-600" />}
              title="ساعات العمل"
              value="9:00 ص - 5:00 م"
            />
            <BranchInfoItem
              icon={<Phone className="h-6 w-6 text-gray-600" />}
              title="رقم الهاتف"
              value={branch.telephone}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-gray-600">حالة التشغيل</span>
            <div className="flex items-center gap-2">
              {branch.suspended ? (
                <>
                  <span className="text-red-600">موقوف</span>
                  <Clock className="h-5 w-5 text-red-600" />
                </>
              ) : (
                <>
                  <span className="text-green-600">نشط</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>

      <Tabs defaultValue="services" className="w-full">
        <TabsList dir="rtl" className="m-auto w-2xl">
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="last-activities">الانشطه الاخيره</TabsTrigger>
        </TabsList>
        <Card dir="rtl" className="p-6">
          <TabsContent value="services">
            <ServicesTable services={branch.services} />
          </TabsContent>
          <TabsContent value="last-activities">
            <LastActivities />
          </TabsContent>
        </Card>
      </Tabs>
    </section>
  );
}

export default BranchDetailsPage;
