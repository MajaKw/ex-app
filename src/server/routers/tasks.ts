import { router, publicProcedure } from '@/src/server/init'
import { z } from 'zod';
import { db } from '@/src/server/db/db'
import { tasks } from '@/src/db/schema'
import { currentUser } from '@clerk/nextjs/server'


export const tasksRouter = router ({
    add: publicProcedure.input(z.object({
        title: z.string(), // Ensure that the ID is a string
      })).mutation(async ({ input }) => {
        const {title} = input;
        console.log(title)
        const user = await currentUser();
        const userId = user?.id;
        await db.insert(tasks).values({ userId: userId, title: title});
      }),
})