export {}

export type Roles = 'admin' | 'moderator'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      // role?: obiekt może ale nie musi zawierać role
      role?: 'admin' | 'moderator',
      subscription: boolean
    }
  }
}