import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';

// created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => {return {}} // no context
  
  export type Context = trpc.inferAsyncReturnType<typeof createContext>;
