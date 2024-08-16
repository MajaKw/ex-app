import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/src/server/routers/_app';
import { createContext } from '@/src/server/context';
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// export API handler
// @link https://trpc.io/docs/v11/server/adapters
// const handler = trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: createContext,
// });
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router: appRouter,
    createContext: createContext,
  });

export { handler as GET, handler as POST };