import { getCashierSummary } from "@/data/cashbox";
import { formatCurrency } from "@/lib/helper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function Default() {
  return (
    <div className={"flex justify-end gap-4"}>
      <Suspense fallback={<Loading />}>
        <FinancialSummary />
      </Suspense>
    </div>
  );
}
async function FinancialSummary() {
  const summary = await getCashierSummary();

  return (
    <>
      <div className="w-48 rounded-xl bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
        <p className="flex items-center justify-between">
          كاش :
          <span className="font-bold">
            {" "}
            {formatCurrency(summary.cashBalance)}
          </span>
        </p>
        <p className="flex items-center justify-between">
          كريديت :
          <span className="font-bold">
            {" "}
            {formatCurrency(summary.creditBalance)}
          </span>
        </p>
      </div>
      <div className="w-48 rounded-xl bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
        <p className="flex items-center justify-between">
          عموله :
          <span className="font-bold">
            {" "}
            {formatCurrency(summary.comessionAmount)}
          </span>
        </p>
      </div>
    </>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-48 rounded-xl bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
      </div>
      <div className="w-48 rounded-xl bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
export default Default;
