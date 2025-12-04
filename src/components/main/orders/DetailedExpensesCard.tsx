import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/helper";

interface ExpenseItem {
  id: number;
  description: string;
  value: number;
}

interface DetailedExpensesCardProps {
  expenses: ExpenseItem[];
}

function DetailedExpensesCard({ expenses }: DetailedExpensesCardProps) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.value,
    0,
  );
  return (
    <Card className="shadow-sm" dir="rtl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">المصاريف التفصيلية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Expense Items */}
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <span className="text-gray-700">{expense.description}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-600">
                  {formatCurrency(expense.value)}
                </span>{" "}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Total Expenses */}
        <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
          <span className="font-bold text-red-900">إجمالي المصاريف</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-900">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DetailedExpensesCard;
