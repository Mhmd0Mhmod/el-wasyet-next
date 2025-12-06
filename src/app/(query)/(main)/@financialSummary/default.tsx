import { checkAccess } from "@/actions/auth/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { ABILITY_IDS } from "@/constants/abilities";
import { getCashierSummary } from "@/data/cashbox";
import { formatCurrency } from "@/lib/helper";
import { CreditCard, TrendingUp, Wallet } from "lucide-react";
import { Suspense } from "react";

async function Default() {
  return (
    <div className="flex flex-col justify-end gap-3 sm:flex-row sm:gap-4">
      <Suspense fallback={<Loading />}>
        <FinancialSummary />
      </Suspense>
    </div>
  );
}

async function FinancialSummary() {
  const canView = await checkAccess(ABILITY_IDS.VIEW_CASH_BOX);
  if (!canView) return null;
  const summary = await getCashierSummary();
  if (!summary) return null;

  return (
    <>
      {/* Cash & Credit Card */}
      <div className="group relative w-full overflow-hidden rounded-lg border border-emerald-600 bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-52">
        <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-150" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-150" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                <Wallet className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold">كاش</span>
            </div>
            <span className="text-lg font-bold tabular-nums">
              {formatCurrency(summary.cashBalance)}
            </span>
          </div>

          <div className="h-px bg-white/30" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                <CreditCard className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold">كريديت</span>
            </div>
            <span className="text-lg font-bold tabular-nums">
              {formatCurrency(summary.creditBalance)}
            </span>
          </div>
        </div>
      </div>

      {/* Commission Card */}
      <div className="group relative w-full overflow-hidden rounded-lg border border-rose-600 bg-gradient-to-br from-rose-500 to-rose-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-52">
        <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-150" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-150" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold">عمولة</span>
            </div>
            <span className="text-lg font-bold tabular-nums">
              {formatCurrency(summary.comessionAmount)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Loading() {
  return (
    <>
      {/* Cash & Credit Loading Skeleton */}
      <div className="w-full overflow-hidden rounded-lg border border-emerald-600 bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 shadow-lg sm:w-52">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-7 w-7 rounded-full bg-white/30" />
              <Skeleton className="h-4 w-12 bg-white/30" />
            </div>
            <Skeleton className="h-5 w-20 bg-white/30" />
          </div>

          <div className="h-px bg-white/30" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-7 w-7 rounded-full bg-white/30" />
              <Skeleton className="h-4 w-12 bg-white/30" />
            </div>
            <Skeleton className="h-5 w-20 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Commission Loading Skeleton */}
      <div className="w-full overflow-hidden rounded-lg border border-rose-600 bg-gradient-to-br from-rose-500 to-rose-600 p-3 shadow-lg sm:w-52">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-7 w-7 rounded-full bg-white/30" />
            <Skeleton className="h-4 w-12 bg-white/30" />
          </div>
          <Skeleton className="h-5 w-20 bg-white/30" />
        </div>
      </div>
    </>
  );
}

export default Default;
