import { publicProcedure, router } from '../trpc'


// type Context = trpc.inferAsyncReturnType<typeof createContext>;
// const t = initTRPC.context<Context>().create();


export const appRouter = router({
    
})

// export type definition of API
export type AppRouter = typeof appRouter;