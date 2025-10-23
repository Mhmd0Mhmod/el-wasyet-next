import QueryProvider from "@/components/providers/QueryProvider";
function layout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
export default layout;
