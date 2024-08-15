import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';

export const createContext = async ({ req }: { req?: Request } = {}) => {
  return {
    lol: "lol from context"
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

