'use client'
import { trpc } from '@/src/utils/trpc';
import { ClerkProvider, SignedIn, SignOutButton } from '@clerk/nextjs';

export default trpc.withTRPC(function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
});