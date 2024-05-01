import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        console.log(`Query refetch failed for: ${query.queryKey}. Error: ${error.message}`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min cashing
      // staleTime: 1000, // 5 min cashing
    },
  },
});
