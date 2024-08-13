import { router, publicProcedure } from '../trpc';
import { db } from '../db/db'
import { countries } from '../../db/schema'
import { z } from 'zod';

export const citiesRouter = router({
    add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      await db.insert(countries).values(opts.input);
      console.log(opts.input)
    }),
})