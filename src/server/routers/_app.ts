import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { countries } from '../../db/schema';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { db } from '../db/db';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createContext } from '../context';
import { citiesRouter } from './cities';
import { countriesRouter } from './countries';
import { usersRouter } from './users';
import { publicProcedure, router } from '../trpc'
import { mergeRouters } from '@trpc/server/unstable-core-do-not-import';


// type Context = trpc.inferAsyncReturnType<typeof createContext>;
// const t = initTRPC.context<Context>().create();

export const appRouter = mergeRouters(countriesRouter, citiesRouter);

// const appRouter = router({
//     users: usersRouter,
//     cities: citiesRouter,
// })


// export type definition of API
export type AppRouter = typeof appRouter;