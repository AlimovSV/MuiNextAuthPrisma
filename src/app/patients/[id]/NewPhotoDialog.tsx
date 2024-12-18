'use client';

import { useTransition } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from '@mui/material/Button';

export type NewPhotoDialogProps = {
  patientId: string;
  uploadPhotoAction: (patientId: string, formData: FormData) => Promise<string>;
};

export default function NewPhotoDialog({ patientId, uploadPhotoAction }: NewPhotoDialogProps) {
  const [isPending, startTransition] = useTransition();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop([file]) {
      startTransition(async () => {
        const formData = new FormData();

        formData.append('file', file);

        await uploadPhotoAction(patientId, formData);
      });
    },
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    multiple: false,
  });

  return (
    <>
      <Button type="button" variant="contained" disabled={isPending} {...getRootProps()}>
        Добавить
      </Button>
      <input {...getInputProps()} />
    </>
  );
}
