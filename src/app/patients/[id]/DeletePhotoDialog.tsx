'use client';

import { useCallback, useState, useTransition } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export type DeletePhotoDialogProps = {
  patientId: string;
  deletePhotoAction: (patientId: string, photoId: string) => Promise<string>;
  children: (openDialog: (photoId: string) => void) => React.ReactNode;
};

export default function DeletePhotoDialog({
  patientId,
  deletePhotoAction,
  children,
}: DeletePhotoDialogProps) {
  const [photoId, setPhotoId] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const handleDelete = useCallback(() => {
    if (photoId) {
      startTransition(async () => {
        await deletePhotoAction(patientId, photoId);
      });
    }
  }, [patientId, photoId, , deletePhotoAction]);

  const isOpen = photoId != null;

  return (
    <>
      <Dialog fullWidth maxWidth="xs" onClose={close} open={isOpen}>
        <DialogTitle>Удалить скан</DialogTitle>
        <DialogContent>Вы уверены?</DialogContent>
        <DialogActions>
          <Button type="button" disabled={isPending} onClick={() => setPhotoId(undefined)}>
            Отмена
          </Button>
          <Button type="button" color="error" disabled={isPending} onClick={handleDelete}>
            Да, Удалить
          </Button>
        </DialogActions>
      </Dialog>
      {children(setPhotoId)}
    </>
  );
}
