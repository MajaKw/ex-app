import stripe  from "@/src/utils/stripe"
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { publicProcedure, router } from "@/src/server/init";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";


export const clerkRouter = router ({
    webhook: publicProcedure.input(
        z.object({
            data: z.record(z.unknown()),
           object: z.string(),
           type: z.string(),
        })
    ).mutation(async ({input, ctx}) => {
        console.log("---------------------------------------------------------")
        console.log("data: ", input.data)
        console.log("type: ", input.type)
        console.log("object: ", input.object)


        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
        if (!WEBHOOK_SECRET) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'No WEBHOOK_SECRET provided',
              });
        }
    })
});