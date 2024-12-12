import Stack from '@mui/material/Stack';

import Header from '@/components/Header';
import MainGrid from '@/components/MainGrid';

export default function Home() {
  return (
    <Stack spacing={2} sx={{ mx: 3 }}>
      <Header breadcrumbs={[{ text: 'Главная страница', link: '/' }, { text: 'Статистика' }]} />
      <MainGrid />
    </Stack>
  );
}
