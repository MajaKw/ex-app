// import { initTRPC } from '@trpc/server';
// import { z } from 'zod';
// import * as trpcExpress from '@trpc/server/adapters/express';
// import * as trpc from '@trpc/server';
// import { db } from '../db/db';
// import { CreateNextContextOptions } from '@trpc/server/adapters/next';
// import { createContext } from '../context';
import { usersRouter } from './users';
import { publicProcedure, router } from '../init'
import { tasksRouter } from './tasks';
import { stripeRouter } from './stripe';
import { clerkRouter } from './clerk';


export const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v10!'),
    users: usersRouter,
    tasks: tasksRouter,
    stripe: stripeRouter,
    clerk: clerkRouter,
})

console.log("app-router")
// export type definition of API
export type AppRouter = typeof appRouter;