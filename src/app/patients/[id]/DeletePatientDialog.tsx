'use client';

import { useDisclosure } from '@mantine/hooks';
import { useCallback, useTransition } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export type DeletePatientDialogProps = {
  id: string;
  action: (id: string) => Promise<string>;
};

export default function DeletePatientDialog({ id, action }: DeletePatientDialogProps) {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      await action(id);
    });
  }, [id, action]);

  return (
    <>
      <Button variant="outlined" color="error" onClick={open}>
        Удалить
      </Button>
      <Dialog fullWidth maxWidth="xs" onClose={close} open={isOpen}>
        <DialogTitle>Удалить пациента</DialogTitle>
        <DialogContent>Вы уверены?</DialogContent>
        <DialogActions>
          <Button type="button" disabled={isPending} onClick={close}>
            Отмена
          </Button>
          <Button type="button" color="error" disabled={isPending} onClick={handleDelete}>
            Да, Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
