import { useMemo } from 'react';

import Stack from '@mui/material/Stack';

import Header from '@/components/Header';
import { NavbarBreadcrumb } from '@/components/NavbarBreadcrumbs';

export default function PatientsPage() {
  const breadcrumbs = useMemo<NavbarBreadcrumb[]>(
    () => [{ text: 'Home', link: '/' }, { text: 'Patients' }],
    [],
  );

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: 'center',
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header breadcrumbs={breadcrumbs} />
    </Stack>
  );
}
