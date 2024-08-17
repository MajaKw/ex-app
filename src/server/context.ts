import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next'
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { initTRPC } from '@trpc/server';

export const createContext = () => {
  // Define your context here
  return {};
};

// export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
//   return {  }
// }

export type Context = Awaited<ReturnType<typeof createContext>>;
