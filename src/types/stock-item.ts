interface StockItem {
  branchId: number;
  branchName: string;
  forms: StockItemForm[];
  withWho: string;
}
interface StockItemForm {
  stockId: number;
  formId: number;
  formName: string;
  quantity: number;
  isLowStock: boolean;
  price: number;
  minimumThreshold: number;
}

export type { StockItem };
