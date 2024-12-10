'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type Props = React.PropsWithChildren<{
  session: Session;
}>;

export default function NextAuthProvider({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
