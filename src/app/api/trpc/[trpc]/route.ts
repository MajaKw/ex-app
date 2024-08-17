import { appRouter } from '@/src/server/routers/app-router';
import { createContext } from '@/src/server/context';
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

console.log("handler")
const handler = async (req: Request) => {
  console.log("handler: ", req.url)

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc/",
    req,
    router: appRouter,
    createContext: () => {
      console.log("Creating context");
      return createContext();
    },
  });

  return response;
};

export { handler as GET, handler as POST };