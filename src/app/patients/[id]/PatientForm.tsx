'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

import * as Yup from 'yup';

import { RHFTextField, YupSpecProvider } from '@/components/Form';

const UpdatePatientDtoSchema = Yup.object({
  firstName: Yup.string().required().label('Имя'),
  lastName: Yup.string().required().label('Фамилия'),
  givenName: Yup.string().nullable().label('Отчество'),
});

export type UpdatePatientDto = Yup.InferType<typeof UpdatePatientDtoSchema>;

export type PatientFormProps = {
  id: string;
  defaultValues: UpdatePatientDto;
  updatePatientAction: (id: string, form: UpdatePatientDto) => Promise<string>;
};

export default function PatientForm({ id, defaultValues, updatePatientAction }: PatientFormProps) {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<UpdatePatientDto>({
    resolver: yupResolver(UpdatePatientDtoSchema),
    defaultValues,
  });

  const handleSubmit = useCallback(
    (data: UpdatePatientDto) => {
      startTransition(async () => {
        await updatePatientAction(id, data);
      });
    },
    [id, updatePatientAction],
  );

  return (
    <FormProvider {...methods}>
      <YupSpecProvider schema={UpdatePatientDtoSchema} isDisabled={isPending}>
        <Card
          component="form"
          id="patient"
          noValidate
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <CardContent>
            <Stack gap={2}>
              <RHFTextField name="lastName" />
              <RHFTextField name="firstName" />
              <RHFTextField name="givenName" />
            </Stack>
          </CardContent>
        </Card>
      </YupSpecProvider>
    </FormProvider>
  );
}
