interface StockItem {
  branchId: number;
  branchName: string;
  forms: StockFormItem[];
  withWho: string;
}
export interface StockFormItem {
  stockId: number;
  formId: number;
  formName: string;
  quantity: number;
  isLowStock: boolean;
  price: number;
  minimumThreshold: number;
}

export type { StockItem };
