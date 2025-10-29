import CommissionTracker from "@/components/Layout/commission-tracker";
import Header from "@/components/Layout/Header";
import MoneyTracker from "@/components/Layout/money-tracker";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b">
        <Header />
      </header>
      <div className="container mx-auto mb-10 max-w-full flex-grow pt-14 md:max-w-10/12">
        {children}
      </div>
      <div className="fixed bottom-2 left-2 z-50 flex flex-col items-center justify-center gap-2">
        <MoneyTracker />
        <CommissionTracker />
      </div>
    </main>
  );
}
export default layout;
