import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import dayjs from '@/theme/locales/dayjs';

import StatCard from '../components/StatCard';
import Copyright from './Copyright';

import prisma from '@/lib/prisma';

export default async function MainGrid() {
  const duration = dayjs.duration(30, 'days');
  const since = dayjs().subtract(duration);

  const patientCount = await prisma.patient.count({
    where: {
      createdAt: {
        gt: since.toDate(),
      },
    },
  });

  const photoCount = await prisma.photo.count({
    where: {
      createdAt: {
        gt: since.toDate(),
      },
    },
  });

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Статистика
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Пациенты"
            value={patientCount.toString()}
            interval={duration.format('за D дней')}
            trend="up"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Сканы"
            value={photoCount.toString()}
            interval={duration.format('за D дней')}
            trend="up"
          />
        </Grid>
      </Grid>
      <Copyright />
    </Box>
  );
}
