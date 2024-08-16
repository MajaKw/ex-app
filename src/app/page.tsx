import { ClerkProvider, SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
     <h1>Hello your in main Page!</h1>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
    </>
  )
}
