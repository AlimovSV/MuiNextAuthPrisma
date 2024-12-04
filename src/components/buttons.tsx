'use client';

import { signOut, useSession } from 'next-auth/react';

export const LogoutButton = () => {
  const session = useSession();

  if (session.status !== 'authenticated') {
    return null;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        signOut();
        e.preventDefault();
      }}
    >
      Sign Out ({JSON.stringify(session.data)})
    </a>
  );
};
