export {}

export type Roles = 'admin' | 'moderator'
// export type Subsription = boolean

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      // role?: obiekt może ale nie musi zawierać role
      role?: 'admin' | 'moderator',
      subscription: boolean
    }
  }
}