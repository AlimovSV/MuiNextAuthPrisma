import Stack from '@mui/material/Stack';

import Header from '@/components/Header';
import MainGrid from './MainGrid';

export default function Home() {
  return (
    <Stack spacing={2} sx={{ mx: 3 }}>
      <Header breadcrumbs={[{ text: 'Главная страница' }]} />
      <MainGrid />
    </Stack>
  );
}
