import { ClerkProvider, SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import TrpcProvider  from './App'

console.log("layout")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <TrpcProvider>
      <ClerkProvider>
        <html lang="en">
          <body>
            <main>{children}</main>
          </body>
        </html>
      </ClerkProvider>
    </TrpcProvider>
  )
}