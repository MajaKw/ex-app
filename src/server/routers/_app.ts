import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { countries } from '../../db/schema';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { db } from '../db/db';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createContext } from '../context';
import { postRouter } from './post';
import { getRouter } from './get';
import { publicProcedure, router } from '../trpc'


// type Context = trpc.inferAsyncReturnType<typeof createContext>;
// const t = initTRPC.context<Context>().create();

export const appRouter = router({
   post: postRouter,
   get: getRouter,
   country: publicProcedure
   .input(z.object({ name: z.string() }))
   .mutation(async (opts) => {
     await db.insert(countries).values(opts.input);
     console.log(opts.input)   }),

    dodaj: {
      country: publicProcedure.input(z.object({ name: z.string() }))
      .mutation(async (opts) => {
        await db.insert(countries).values(opts.input);
        console.log(opts.input)   }),
    }

  });

// export type definition of API
export type AppRouter = typeof appRouter;