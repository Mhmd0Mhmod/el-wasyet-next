import { formatCurrency } from "@/lib/helper";

function MoneyTracker() {
  return (
    <div className="w-48 rounded-xl bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
      <p className="flex items-center justify-between">
        كاش :<span className="font-bold"> {formatCurrency(5000)}</span>
      </p>
      <p className="flex items-center justify-between">
        كريديت :<span className="font-bold"> {formatCurrency(1500)}</span>
      </p>
    </div>
  );
}
export default MoneyTracker;
