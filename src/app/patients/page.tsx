import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import prisma from '@/lib/prisma';

import Header from '@/components/Header';
import { NavbarBreadcrumb } from '@/components/NavbarBreadcrumbs';
import PatientsList from './PatientsList';

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany();
  const breadcrumbs: NavbarBreadcrumb[] = [
    { text: 'Главная страница', link: '/' },
    { text: 'Пациенты' },
  ];

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
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Пациенты
        </Typography>
        <PatientsList rows={patients} />
      </Box>
    </Stack>
  );
}
