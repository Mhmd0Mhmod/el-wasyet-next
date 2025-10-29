import { formatCurrency } from "@/lib/helper";

function CommissionTracker() {
  return (
    <div className="w-48 rounded-xl bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
      <p className="flex items-center justify-between">
        عموله :<span className="font-bold"> {formatCurrency(5000)}</span>
      </p>
    </div>
  );
}
export default CommissionTracker;
