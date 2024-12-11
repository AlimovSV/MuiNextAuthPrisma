'use client';

import dayjs from 'dayjs';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Patient } from '@prisma/client';

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
  return <DataGrid columns={columns} rows={rows} />;
}
