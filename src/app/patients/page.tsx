import { redirect, RedirectType } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import prisma from '@/lib/prisma';

import Header from '@/components/Header';
import NewPatientDialog, { NewPatientDto } from './NewPatientDialog';
import PatientsList from './PatientsList';

export default async function PatientsPage() {
  async function createPatient(data: NewPatientDto): Promise<string> {
    'use server';

    await prisma.patient.create({
      data,
    });

    redirect('/patients', RedirectType.replace);
  }

  const patients = await prisma.patient.findMany();

  return (
    <Stack spacing={2} sx={{ mx: 3 }}>
      <Header breadcrumbs={[{ text: 'Главная страница', link: '/' }, { text: 'Пациенты' }]} />
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography component="h2" variant="h6">
            Пациенты
          </Typography>
          <NewPatientDialog createPatientAction={createPatient} />
        </Stack>
        <PatientsList rows={patients} />
      </Box>
    </Stack>
  );
}
