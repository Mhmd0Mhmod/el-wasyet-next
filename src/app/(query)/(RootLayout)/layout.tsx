import Header from "@/components/Layout/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b">
        <Header />
      </header>
      <div className="container mx-auto mb-10 max-w-full flex-grow pt-14 md:max-w-10/12">
        {children}
      </div>
    </main>
  );
}
export default layout;
