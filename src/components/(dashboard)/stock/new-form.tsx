"use client";
import { Stock } from "@/schema/stock";
import { StockItem } from "@/types/stock-item";
import { useForm } from "react-hook-form";

function NewForm({
  form: initialForm,
  branchId,
}: {
  form?: StockItem;
  branchId: string;
}) {
  const form = useForm<Stock>({});

  return <div>new-form</div>;
}
export default NewForm;
