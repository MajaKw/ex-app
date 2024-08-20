import stripe  from "@/src/utils/stripe"
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { publicProcedure, router } from "@/src/server/init";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import { users } from "@/src/db/schema";
import { db } from "../db/db";


export const clerkRouter = router ({
    webhook: publicProcedure.input(
        z.object({
            data: z.record(z.unknown()),
           object: z.string(),
           type: z.string(),
        })
    ).mutation(async ({input}) => {
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
        if (!WEBHOOK_SECRET) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'No WEBHOOK_SECRET provided',
              });
        }
        const headerPayload = headers()
        const svix_id = headerPayload.get('svix-id')
        const svix_timestamp = headerPayload.get('svix-timestamp')
        const svix_signature = headerPayload.get('svix-signature')

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response('Error occured -- no svix headers', {
            status: 400,
            })
        }

        if(input.type === 'user.created'){
            if(input.data.id === undefined){
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'No user_id provided',
                  });
            }
            const userId = input.data.id! as string;
            await db.insert(users).values({ id: userId }).returning()           
            await clerkClient().users.updateUserMetadata(userId, {
              publicMetadata: {
                role: "moderator",
                subscription: false,
              }
            })
        }

    })
});