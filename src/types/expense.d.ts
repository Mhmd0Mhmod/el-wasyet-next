interface Expense {
  id: number,
  entryDate: string,
  amount: number,
  comments: string,
  branchName: string,
  employeeName: string
}

interface ExpenseDetails extends Expense {
  category: string;
  branch: string;
}
