'use client'
import { trpc } from '@/src/utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';

export default trpc.withTRPC(function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body>{children}</body>
      </ClerkProvider>
    </html>
  )
});