import Header from "@/components/Layout/Header";
import QueryProvider from "@/components/providers/QueryProvider";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <main className="min-h-screen flex flex-col">
        <header className="h-16 border-b flex items-center ">
          <Header />
        </header>
        <div className="flex-grow container md:max-w-10/12 mx-auto pt-14 mb-10 max-w-11/12">
          {children}
        </div>
      </main>
    </QueryProvider>
  );
}
export default layout;
