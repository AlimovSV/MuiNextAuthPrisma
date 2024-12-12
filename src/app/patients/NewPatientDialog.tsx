'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import * as Yup from 'yup';

import { RHFTextField, YupSpecProvider } from '@/components/Form';

const NewPatientDtoSchema = Yup.object({
  firstName: Yup.string().required().label('Имя'),
  lastName: Yup.string().required().label('Фамилия'),
  givenName: Yup.string().nullable().label('Отчество'),
});

export type NewPatientDto = Yup.InferType<typeof NewPatientDtoSchema>;

export type NewPatientDialogProps = {
  action: (form: NewPatientDto) => Promise<string>;
};

export default function NewPatientDialog({ action }: NewPatientDialogProps) {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<NewPatientDto>({
    resolver: yupResolver(NewPatientDtoSchema),
  });

  const handleSubmit = useCallback(
    (data: NewPatientDto) => {
      startTransition(async () => {
        await action(data);
      });
    },
    [action],
  );

  return (
    <>
      <Button variant="contained" onClick={open}>
        Добавить пациента
      </Button>
      <FormProvider {...methods}>
        <YupSpecProvider schema={NewPatientDtoSchema} isDisabled={isPending}>
          <Dialog
            fullWidth
            maxWidth="sm"
            onClose={close}
            open={isOpen}
            PaperProps={{
              component: 'form',
              noValidate: true,
              onSubmit: methods.handleSubmit(handleSubmit),
            }}
          >
            <DialogTitle>Новый пациент</DialogTitle>
            <DialogContent>
              <Stack gap={2}>
                <RHFTextField name="lastName" />
                <RHFTextField name="firstName" />
                <RHFTextField name="givenName" />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button type="reset" disabled={isPending} onClick={close}>
                Отмена
              </Button>
              <Button type="submit" disabled={isPending}>
                Создать
              </Button>
            </DialogActions>
          </Dialog>
        </YupSpecProvider>
      </FormProvider>
    </>
  );
}
