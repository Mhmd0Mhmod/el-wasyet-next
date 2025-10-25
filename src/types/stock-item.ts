interface StockItem {
  branchId: number;
  branchName: string;
  forms: StockItemForm[];
}
interface StockItemForm {
  formId: number;
  formName: string;
  quantity: number;
  isLowStock: boolean;
}
interface StockItemFormSchema {
  branchId: number;
  forms: {
    formTypeId?: number;
    quantity: number;
    minimumThreshold: number;
    price: number;
  }[];
}
export type { StockItem, StockItemForm, StockItemFormSchema };
