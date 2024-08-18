import stripe  from "@/src/utils/stripe"
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { publicProcedure, router } from "@/src/server/init";


export const stripeRouter = router ({
    webhook: publicProcedure.mutation(async (opts) => {
        console.log(opts)
    })
});