import { Roles } from '@/types/global'
import { auth } from '@clerk/nextjs/server'

export const checkRole = (role: Roles) => {
    const { sessionClaims } = auth()
    // ?. means "if sessionClaims is not null do sth"
    return sessionClaims?.metadata.role === role
}

export const check