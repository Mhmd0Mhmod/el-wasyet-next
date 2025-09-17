import Header from "@/components/Layout/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="h-16 border-b flex items-center ">
        <Header />
      </header>
      <div className="flex-grow">{children}</div>
    </main>
  );
}
export default layout;
