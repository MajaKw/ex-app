import { router, publicProcedure } from '@/src/server/init'
import { z } from 'zod';
import { db } from '@/src/server/db/db'
import { users } from '@/src/db/schema'


export const usersRouter = router ({
    all: publicProcedure.query(async ()=>{
        const result = await db.select().from(users);
        console.log(result);
        return result;
    }),
    add: publicProcedure.mutation(async() => {
        await db.insert(users).values({id: "user_29w83sxmDNGwOuEthce5gg56FcC" })
    })
})