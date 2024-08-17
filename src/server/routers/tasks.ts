import { router, publicProcedure } from '@/src/server/init'
import { z } from 'zod';
import { db } from '@/src/server/db/db'
import { tasks } from '@/src/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from "drizzle-orm";

export const tasksRouter = router ({
    all: publicProcedure.query(async () => {
        const userId = (await currentUser())?.id;
        console.log(userId)
        if(!userId){
            throw new Error("User not found")
        }
        return await db.select({title: tasks.title, id: tasks.id}).from(tasks).where(eq(tasks.userId, userId));
    }),
    add: publicProcedure.input(z.object({
        title: z.string(), // Ensure that the ID is a string
      })).mutation(async ({ input }) => {
        const {title} = input;
        console.log(title)
        const userId = (await currentUser())?.id;
        const result = await db.insert(tasks).values({ userId: userId, title: title}).returning({ id: tasks.id, title: tasks.title });
        return result
      }),

   
})