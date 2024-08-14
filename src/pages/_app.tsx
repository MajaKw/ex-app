import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

import { ClerkProvider, RedirectToUserProfile, SignIn, SignInButton, SignOutButton, SignUp, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log(pageProps)
  return (
    <ClerkProvider {...pageProps}>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <Component {...pageProps} />
    </ClerkProvider>
  )
};
export default trpc.withTRPC(MyApp);

