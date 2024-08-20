import { usersRouter } from './users';
import { publicProcedure, router } from '../init'
import { tasksRouter } from './tasks';
import { clerkRouter } from './clerk';


export const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v10!'),
    users: usersRouter,
    tasks: tasksRouter,
    clerk: clerkRouter,
})

console.log("app-router")
// export type definition of API
export type AppRouter = typeof appRouter;