"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface ServiceFee {
  id: number;
  name: string;
  amount: number;
}

interface ServiceName {
  id: number;
  arabicName: string;
  englishName: string;
}

interface ServiceType {
  id: number;
  typeName: string;
  description: string;
}

function ServiceCostTabs() {
  const [serviceFees, setServiceFees] = useState<ServiceFee[]>([]);
  const [serviceNames, setServiceNames] = useState<ServiceName[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const [newFee, setNewFee] = useState({ name: "", amount: 0 });
  const [newName, setNewName] = useState({ arabicName: "", englishName: "" });
  const [newType, setNewType] = useState({ typeName: "", description: "" });

  const addServiceFee = () => {
    if (newFee.name && newFee.amount > 0) {
      setServiceFees([
        ...serviceFees,
        { id: Date.now(), name: newFee.name, amount: newFee.amount },
      ]);
      setNewFee({ name: "", amount: 0 });
    }
  };

  const addServiceName = () => {
    if (newName.arabicName && newName.englishName) {
      setServiceNames([
        ...serviceNames,
        {
          id: Date.now(),
          arabicName: newName.arabicName,
          englishName: newName.englishName,
        },
      ]);
      setNewName({ arabicName: "", englishName: "" });
    }
  };

  const addServiceType = () => {
    if (newType.typeName) {
      setServiceTypes([
        ...serviceTypes,
        {
          id: Date.now(),
          typeName: newType.typeName,
          description: newType.description,
        },
      ]);
      setNewType({ typeName: "", description: "" });
    }
  };

  const removeServiceFee = (id: number) => {
    setServiceFees(serviceFees.filter((fee) => fee.id !== id));
  };

  const removeServiceName = (id: number) => {
    setServiceNames(serviceNames.filter((name) => name.id !== id));
  };

  const removeServiceType = (id: number) => {
    setServiceTypes(serviceTypes.filter((type) => type.id !== id));
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="fees" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fees">رسوم التكلفة</TabsTrigger>
          <TabsTrigger value="names">اسم التكلفة</TabsTrigger>
          <TabsTrigger value="types">نوع التكلفة</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة رسوم التكلفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <Label htmlFor="fee-name">اسم الرسم</Label>
                  <Input
                    id="fee-name"
                    placeholder="ادخل اسم الرسم"
                    value={newFee.name}
                    onChange={(e) =>
                      setNewFee({ ...newFee, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="fee-amount">المبلغ</Label>
                  <Input
                    id="fee-amount"
                    type="text"
                    placeholder="0"
                    value={newFee.amount}
                    onChange={(e) =>
                      setNewFee({ ...newFee, amount: Number(e.target.value) })
                    }
                  />
                </div>
                <Button
                  onClick={addServiceFee}
                  className="w-full sm:mt-6 sm:w-auto"
                >
                  إضافة
                </Button>
              </div>

              <div className="space-y-2">
                {serviceFees.map((fee) => (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <div>
                      <span className="font-medium">{fee.name}</span>
                      <span className="mr-4 text-gray-500">
                        {fee.amount.toLocaleString("ar-EG")} جنيه
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeServiceFee(fee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="names" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة أسماء التكلفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <Label htmlFor="arabic-name">الاسم بالعربية</Label>
                  <Input
                    id="arabic-name"
                    placeholder="ادخل الاسم بالعربية"
                    value={newName.arabicName}
                    onChange={(e) =>
                      setNewName({ ...newName, arabicName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="english-name">الاسم بالإنجليزية</Label>
                  <Input
                    id="english-name"
                    placeholder="Enter name in English"
                    value={newName.englishName}
                    onChange={(e) =>
                      setNewName({ ...newName, englishName: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={addServiceName}
                  className="w-full sm:mt-6 sm:w-auto"
                >
                  إضافة
                </Button>
              </div>

              <div className="space-y-2">
                {serviceNames.map((name) => (
                  <div
                    key={name.id}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <div>
                      <span className="font-medium">{name.arabicName}</span>
                      <span className="mr-4 text-gray-500">
                        {name.englishName}
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeServiceName(name.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة أنواع التكلفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <Label htmlFor="type-name">نوع التكلفة</Label>
                  <Input
                    id="type-name"
                    placeholder="ادخل نوع التكلفة"
                    value={newType.typeName}
                    onChange={(e) =>
                      setNewType({ ...newType, typeName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="type-description">الوصف</Label>
                  <Input
                    id="type-description"
                    placeholder="وصف نوع التكلفة"
                    value={newType.description}
                    onChange={(e) =>
                      setNewType({ ...newType, description: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={addServiceType}
                  className="w-full sm:mt-6 sm:w-auto"
                >
                  إضافة
                </Button>
              </div>

              <div className="space-y-2">
                {serviceTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <div>
                      <span className="font-medium">{type.typeName}</span>
                      {type.description && (
                        <span className="mr-4 text-gray-500">
                          {type.description}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeServiceType(type.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ServiceCostTabs;
