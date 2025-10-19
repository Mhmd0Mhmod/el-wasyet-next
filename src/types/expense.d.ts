interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseDetails extends Expense {
  category: string;
  branch: string;
}
