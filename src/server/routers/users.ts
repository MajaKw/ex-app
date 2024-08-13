import { router, publicProcedure } from '../trpc'
import { users } from '../../db/schema'
import { db } from '../db/db'
import { z } from 'zod';


export const usersRouter = router({
    list: publicProcedure.query(async ({input, ctx}) => {
        const result = await db.select().from(users)
       
        return result;
      }),
});