import { router, publicProcedure } from '../trpc'
import { countries } from '../../db/schema'
import { db } from '../db/db'
import { z } from 'zod';


export const countriesRouter = router({
    country: publicProcedure.query(async ({input, ctx}) => {
        const result = await db.select().from(countries)
        console.log(result)
        console.log(ctx)
       
        return result;
      }),
      add: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async (opts) => {
        await db.insert(countries).values(opts.input);
        console.log(opts.input)
      }),
})
