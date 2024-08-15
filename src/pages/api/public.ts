import { clerkClient } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { role, user_id } = req.body

    await clerkClient.users.updateUserMetadata(user_id, {
        publicMetadata: {
            role,
        }
    })
}