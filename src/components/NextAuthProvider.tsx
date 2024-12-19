'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type Props = React.PropsWithChildren<{
  session?: Session | null;
}>;

export default function NextAuthProvider({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
