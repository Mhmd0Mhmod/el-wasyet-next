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
export type { StockItem, StockItemForm };
