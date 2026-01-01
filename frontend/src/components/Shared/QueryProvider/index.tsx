"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({children,dehydratedState}: {children: ReactNode; dehydratedState?: DehydratedState | null;}) {
  const [queryClient] = useState(() => new QueryClient({defaultOptions: {queries: { staleTime: 1000 * 60, refetchOnWindowFocus: false}}}));

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
