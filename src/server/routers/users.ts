import { router, publicProcedure } from '@/src/server/init'
import { z } from 'zod';
import { db } from '@/src/server/db/db'
import { users } from '@/src/db/schema'
import { currentUser, EmailAddress } from '@clerk/nextjs/server'


export const usersRouter = router ({
    all: publicProcedure.query(async ()=>{
        const result = await db.select().from(users);
        console.log(result);
        return result;
    }),
    add: publicProcedure.input(z.object({
        id: z.string(), // Ensure that the ID is a string
      }))
      .mutation(async ({ input }) => {
        console.log("Adding user with ID:", input.id);
        await db.insert(users).values({ id: input.id });
      }),
    email: publicProcedure.query(async () => {
        const user = await currentUser();
        console.log("trying to get email of user_id: ", user?.id)
        const firstEmail = user?.emailAddresses[0].emailAddress;
        console.log("email: ", firstEmail)
    
        return firstEmail;
    })
})