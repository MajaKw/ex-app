import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { db } from '../db/db';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createContext } from '../context';
import { usersRouter } from './users';
import { publicProcedure, router } from '../init'


export const appRouter = router({
    users: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;