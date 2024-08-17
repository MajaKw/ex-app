"use client";

import { trpc } from "@/src/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/react-query";
import { useState } from "react";
// import superjson from "superjson";
console.log("App")
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } },
});

export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
        links: [
          httpBatchLink({
            url: 'http://localhost:3000/api/trpc',
            // You can pass any HTTP headers you wish here
            async headers() {
              return {
                // authorization: getAuthCookie(),
              };
            },
          }),
        ],
      }),
    );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}