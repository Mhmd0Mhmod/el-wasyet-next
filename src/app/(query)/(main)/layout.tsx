import Header from "@/components/Layout/Header";

function layout({
  children,
  financialSummary,
}: {
  children: React.ReactNode;
  financialSummary: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="relative">
        <div className="sticky top-4 z-10 mr-auto w-fit p-2">
          {financialSummary}
        </div>
        <div className="container mx-auto mb-10 max-w-full grow px-4 sm:px-6 lg:max-w-[90%] xl:max-w-10/12">
          {children}
        </div>
      </div>
    </main>
  );
}
export default layout;
