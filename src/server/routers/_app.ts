import { publicProcedure, router } from '@/src/server/trpc'
import { db } from '@/src/server/db/db'
import { users } from '@/src/db/schema'
import { usersRouter } from './users';
// type Context = trpc.inferAsyncReturnType<typeof createContext>;
// const t = initTRPC.context<Context>().create();


export const appRouter = router({
    users: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;