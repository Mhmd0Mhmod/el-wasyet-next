import QueryProvider from "@/components/providers/QueryProvider";
import { SessionProvider } from "next-auth/react";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider refetchInterval={60} refetchOnWindowFocus={false}>
        {children}
      </SessionProvider>
    </QueryProvider>
  );
}
export default layout;
