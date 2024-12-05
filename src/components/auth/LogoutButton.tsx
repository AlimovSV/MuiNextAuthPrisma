'use client';

import { Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

export const LogoutButton = () => {
  const session = useSession();

  if (session.status !== 'authenticated') {
    return null;
  }

  return (
    <Button
      variant="contained"
      onClick={(e) => {
        signOut();
        e.preventDefault();
      }}
    >
      Sign Out ({session.data.user?.name})
    </Button>
  );
};
