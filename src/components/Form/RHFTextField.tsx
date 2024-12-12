import React from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import { useSpec } from './YupSpecContext';

type Props = TextFieldProps & {
  name: string;
};

export function RHFTextField({
  type = 'text',
  name,
  label,
  helperText,
  disabled,
  required,
  ...props
}: Props) {
  const spec = useSpec();
  const schema = spec.getSchema(name);
  const htmlInput = schema?.tests.reduce(
    (memo, { OPTIONS: { name, params } = {} }) => {
      if (params) {
        switch (name) {
          case 'matches':
            if (params.regex instanceof RegExp) {
              memo.pattern = params.regex.toString();
            }
            break;
          case 'length':
            if (typeof params.length === 'number') {
              memo.maxLength = params.length;
            }
            break;
          case 'max':
            if (typeof params.max === 'number') {
              memo.maxLength = params.max;
            }
            break;
        }
      }
      return memo;
    },
    { ...props.slotProps?.htmlInput } as React.InputHTMLAttributes<HTMLInputElement>,
  );

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          type={type}
          value={field.value ?? ''}
          required={spec.isRequired(name, required)}
          disabled={spec.isDisabled(name, disabled)}
          label={spec.label(name, label)}
          slotProps={{ htmlInput }}
          error={error != null}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  );
}
