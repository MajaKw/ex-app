import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { initTRPC } from '@trpc/server';

// export const createContext = async ({ req }: { req?: Request } = {}) => {
//   return {
//     lol: "lol from context"
//   };
// };

// export type Context = trpc.inferAsyncReturnType<typeof createContext>;

// export const createContext = async (opts: CreateNextContextOptions) => {
//   // const session = await getSession({ req: opts.req });
 
//   return {
//     // session,
//   };
// };

// src/trpc/context.ts
export const createContext = () => {
  // Define your context here
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
