"use client";

import { useFormsServices } from "@/hooks/useFormsServices";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OverheadValues } from "@/schema/service";

interface AddOverheadFormProps {
  name: string;
  title?: string;
  penaltyExtraFee?: boolean;
  penaltyBankFeePrecentage?: boolean;
}

function AddOverheadForm({
  name,
  title = "التكاليف الإضافية",
  penaltyExtraFee = true,
  penaltyBankFeePrecentage = true,
}: AddOverheadFormProps) {
  const form = useFormContext();
  const overheadFields: OverheadValues[] = form.watch(name);
  const { remove: removeOverhead, append: appendOverhead } = useFieldArray({
    control: form.control,
    name,
  });
  function addNewOverhead() {
    appendOverhead({
      value: 0,
      description: "",
      penalty: true,
      forms: false,
      adminFees: false,
      penaltyBankFeePrecentage: 0,
      penaltyExtraFee: 0,
      relatedAgent: false,
      formTypeID: null,
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Button type="button" variant="outline" onClick={addNewOverhead}>
          <Plus className="mr-2 h-4 w-4" />
          إضافة تكلفة
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {overheadFields.map((field, index) => (
            <Overhead
              index={index}
              key={field.id || index}
              name={name}
              removeOverhead={removeOverhead}
              penaltyExtraFee={penaltyExtraFee}
              penaltyBankFeePrecentage={penaltyBankFeePrecentage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
function Overhead({
  index,
  name,
  removeOverhead,
  penaltyExtraFee,
  penaltyBankFeePrecentage,
}: {
  index: number;
  name: string;
  removeOverhead: (idx: number) => void;
  penaltyExtraFee?: boolean;
  penaltyBankFeePrecentage?: boolean;
}) {
  const form = useFormContext();
  const onSelectFormChange = useCallback(
    (value: "penalty" | "forms" | "adminFees") => {
      form.setValue(`${name}.${index}.value`, 0);
      form.setValue(`${name}.${index}.penalty`, false);
      form.setValue(`${name}.${index}.forms`, false);
      form.setValue(`${name}.${index}.adminFees`, false);
      form.setValue(`${name}.${index}.${value}`, true);
      if (value !== "forms") {
        form.setValue(`${name}.${index}.formTypeID`, null);
      }
    },
    [form, name, index],
  );
  const fieldValues = form.watch(`${name}.${index}`) || {};
  const isFormType = fieldValues.forms || false;
  const isPenaltyType = fieldValues.penalty || false;

  const getOverheadType = () => {
    if (isFormType) return "forms";
    if (isPenaltyType) return "penalty";
    return "adminFees";
  };
  return (
    <>
      <div className="space-y-5">
        {/* Type Selection */}
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <Label>نوع التكلفة</Label>
            <Select
              onValueChange={(value: "penalty" | "forms" | "adminFees") =>
                onSelectFormChange(value)
              }
              value={getOverheadType()}
              dir="rtl"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر نوع التكلفة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="penalty">غرامة</SelectItem>
                <SelectItem value="forms">استمارات</SelectItem>
                <SelectItem value="adminFees">رسوم ادارية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-5 self-center"
            onClick={() => removeOverhead(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${name}.${index}.description`}>اسم الرسوم</Label>
            <Input
              id={`${name}.${index}.description`}
              type="text"
              {...form.register(`${name}.${index}.description`)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${name}.${index}.value`}> الرسوم</Label>
            <Input
              id={`${name}.${index}.value`}
              type="text"
              disabled={isFormType}
              {...form.register(`${name}.${index}.value`, {
                setValueAs: (value) => (value === "" ? 0 : Number(value)),
              })}
            />
          </div>
          {isFormType && <FormsComponent index={index} name={name} />}
          {isPenaltyType && (
            <PenaltyComponent
              index={index}
              name={name}
              penaltyExtraFee={penaltyExtraFee}
              penaltyBankFeePrecentage={penaltyBankFeePrecentage}
            />
          )}
        </div>
      </div>
    </>
  );
}

function FormsComponent({ index, name }: { index: number; name: string }) {
  const { forms } = useFormsServices();
  const form = useFormContext();

  const getOverheadFormType = useCallback(
    (formTypeID: number | null) => {
      return forms.find((f) => f.id === formTypeID) || null;
    },
    [forms],
  );

  const handleFormTypeChange = useCallback(
    (value: string) => {
      const formTypeID = Number(value);
      form.setValue(`${name}.${index}.formTypeID`, formTypeID);
      form.setValue(
        `${name}.${index}.value`,
        getOverheadFormType(formTypeID)?.value || 0,
      );
    },
    [form, name, index, getOverheadFormType],
  );

  const currentValue = form.watch(`${name}.${index}.formTypeID`);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`${name}.${index}.formTypeID`}>اختر نوع الاستمارة</Label>
      {forms.length > 0 ? (
        <Select
          value={currentValue?.toString() || ""}
          onValueChange={handleFormTypeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="اختر نوع الاستمارة" />
          </SelectTrigger>
          <SelectContent>
            {forms.map((el) => (
              <SelectItem key={el?.id} value={el?.id?.toString()}>
                {el.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input type="text" disabled value={"لا توجد استمارات"} />
      )}
    </div>
  );
}
function PenaltyComponent({
  index,
  name,
  penaltyExtraFee,
  penaltyBankFeePrecentage,
}: {
  index: number;
  name: string;
  penaltyExtraFee?: boolean;
  penaltyBankFeePrecentage?: boolean;
}) {
  const form = useFormContext();

  return (
    <>
      {penaltyExtraFee && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${name}.${index}.penaltyExtraFee`}>
            الرسوم الإضافية
          </Label>

          <Input
            id={`${name}.${index}.penaltyExtraFee`}
            type="text"
            placeholder="الرسوم الإضافية"
            {...form.register(`${name}.${index}.penaltyExtraFee`, {
              setValueAs: (value) => (value === "" ? 0 : Number(value)),
            })}
          />
        </div>
      )}
      {penaltyBankFeePrecentage && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${name}.${index}.penaltyBankFeePrecentage`}>
            نسبة الرسوم البنكيه%
          </Label>
          <Input
            id={`${name}.${index}.penaltyBankFeePrecentage`}
            type="text"
            placeholder="نسبة الرسوم البنكيه%"
            {...form.register(`${name}.${index}.penaltyBankFeePrecentage`, {
              setValueAs: (value) => (value === "" ? 0 : Number(value)),
            })}
          />
        </div>
      )}
    </>
  );
}
export default AddOverheadForm;
