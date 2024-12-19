import fs from 'fs';
import path from 'path';

import { createId } from '@paralleldrive/cuid2';
import { extension } from 'mime-types';
import { getServerSession } from 'next-auth/next';
import { notFound, redirect } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '@/components/Header';
import DeletePatientDialog from './DeletePatientDialog';
import NewPhotoDialog from './NewPhotoDialog';
import PatientForm, { UpdatePatientDto } from './PatientForm';
import ScanList from './ScanList';

import prisma from '@/lib/prisma';

import { authOptions } from '@/lib/auth';
import { formatPatientName } from '@/lib/utils';

type PatientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientPage(props: PatientPageProps) {
  async function updatePatient(id: string, data: UpdatePatientDto): Promise<string> {
    'use server';

    await prisma.patient.update({
      where: { id },
      data,
    });

    redirect('/patients');
  }

  async function deletePatient(id: string): Promise<string> {
    'use server';

    await prisma.patient.delete({
      where: { id },
    });

    redirect('/patients');
  }

  async function uploadPhoto(patientId: string, formData: FormData): Promise<string> {
    'use server';

    const session = await getServerSession(authOptions);

    if (!session) {
      notFound();
    }

    const file = formData.get('file');

    if (file && typeof file === 'object') {
      const id = createId();
      const fileName = `${id}.${extension(file.type)}`;
      const filePath = path.join(process.cwd(), 'public/photos', patientId);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), Buffer.from(await file.arrayBuffer()));

      await prisma.photo.create({
        data: {
          id,
          contentType: file.type,
          patientId,
          userId: session.user.id,
        },
      });
    }

    redirect(`/patients/${patientId}`);
  }

  async function deletePhoto(patientId: string, id: string): Promise<string> {
    'use server';

    const { contentType } = await prisma.photo.delete({
      where: {
        id,
        patientId,
      },
      select: {
        contentType: true,
      },
    });

    const fileName = `${id}.${extension(contentType)}`;
    const filePath = path.join(process.cwd(), 'public/photos', patientId);

    fs.unlinkSync(path.join(filePath, fileName));

    redirect(`/patients/${patientId}`);
  }

  const params = await props.params;
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
    select: {
      firstName: true,
      lastName: true,
      givenName: true,
    },
  });
  const photos = await prisma.photo.findMany({
    where: { patientId: params.id },
    select: {
      id: true,
      user: {
        select: {
          name: true,
        },
      },
      patientId: true,
      contentType: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!patient) {
    return notFound();
  }

  return (
    <Stack spacing={2} sx={{ mx: 3 }}>
      <Header
        breadcrumbs={[
          { text: 'Главная страница', link: '/' },
          { text: 'Пациенты', link: `/patients` },
          { text: formatPatientName(patient) },
        ]}
      />
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography component="h2" variant="h6">
            Карточка пациента
          </Typography>
          <Stack direction="row" gap={1.5}>
            <Button type="submit" variant="outlined" form="patient">
              Сохранить
            </Button>
            <DeletePatientDialog id={params.id} deletePatientAction={deletePatient} />
          </Stack>
        </Stack>
        <PatientForm id={params.id} defaultValues={patient} updatePatientAction={updatePatient} />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography component="h2" variant="h6">
            Сканы
          </Typography>
          <Stack direction="row" gap={1.5}>
            <NewPhotoDialog patientId={params.id} uploadPhotoAction={uploadPhoto} />
          </Stack>
        </Stack>
        <ScanList patientId={params.id} photos={photos} deletePhotoAction={deletePhoto} />
      </Box>
    </Stack>
  );
}
