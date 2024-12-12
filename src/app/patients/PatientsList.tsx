'use client';

import dayjs from 'dayjs';
import React from 'react';

import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Patient } from '@prisma/client';
import { useRouter } from 'next/navigation';

const columns: GridColDef<Patient>[] = [
  {
    field: 'lastName',
    headerName: 'Фамилия',
    flex: 0.3,
  },
  {
    field: 'firstName',
    headerName: 'Имя',
    flex: 0.3,
  },
  {
    field: 'givenName',
    headerName: 'Отчество',
    flex: 0.4,
  },
  {
    field: 'createdAt',
    headerName: 'Дата создания',
    minWidth: 160,
    valueFormatter(value: Date) {
      return dayjs(value).format('ll');
    },
  },
];

type Props = {
  rows: Patient[];
};

export default function PatientsList({ rows }: Props) {
  const router = useRouter();
  const handleRowClick = React.useCallback(
    (event: GridRowParams) => {
      router.push(`/patients/${event.id}`);
    },
    [router],
  );

  return (
    <DataGrid
      disableRowSelectionOnClick
      columns={columns}
      rows={rows}
      onRowClick={handleRowClick}
    />
  );
}
