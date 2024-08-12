import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { countries } from '../../db/schema';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { db } from '../db/db';

// created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => {return {}} // no context
  
  type Context = trpc.inferAsyncReturnType<typeof createContext>;
  const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
    getCountry: t.procedure.query(async (opts) => {
      const result = await db.select().from(countries)
      console.log(result)
      return result;
    }),
    createCountry: t.procedure
      .input(z.object({ name: z.string() }))
      .mutation(async (opts) => {
        await db.insert(countries).values(opts.input);
      }),
  });

// export type definition of API
export type AppRouter = typeof appRouter;