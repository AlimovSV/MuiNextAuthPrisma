import { createContext, useContext } from 'react';
import { Schema } from 'yup';

export interface Spec {
  getSchema: (name: string) => Schema | undefined;
  label: (name: string, label?: React.ReactNode) => React.ReactNode;
  isNullable: (name: string, isNullable?: boolean) => boolean | undefined;
  isDisabled: (name: string, isDisabled?: boolean) => boolean | undefined;
  isReadOnly: (name: string, isReadOnly?: boolean) => boolean | undefined;
  isRequired: (name: string, isRequired?: boolean) => boolean | undefined;
}

export const SpecContext = createContext<Spec>({
  getSchema: () => undefined,
  label: (name, label) => label ?? name,
  isNullable: (_name, isNullable) => isNullable,
  isDisabled: (_name, isDisabled) => isDisabled,
  isReadOnly: (_name, isReadOnly) => isReadOnly,
  isRequired: (_name, isRequired) => isRequired,
});

export const useSpec = () => {
  return useContext(SpecContext);
};
