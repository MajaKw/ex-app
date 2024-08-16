import { trpc } from '@/src/utils/trpc';
import { SignedOut, SignInButton, SignUpButton, SignedIn, SignOutButton } from '@clerk/nextjs';

export default function Page() {
  return <>
   <h1>Hello, Next.js!</h1>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
  </>
}