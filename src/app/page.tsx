import { useMemo } from 'react';

import Stack from '@mui/material/Stack';

import Header from '@/components/Header';
import MainGrid from '@/components/MainGrid';
import { NavbarBreadcrumb } from '@/components/NavbarBreadcrumbs';

export default function Home() {
  const breadcrumbs = useMemo<NavbarBreadcrumb[]>(
    () => [{ text: 'Главная страница', link: '/' }, { text: 'Статистика' }],
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
      <MainGrid />
    </Stack>
  );
}
