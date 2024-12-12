import { useMemo } from 'react';
import { ObjectSchema, Schema, isSchema, reach } from 'yup';

import { Spec, SpecContext } from './YupSpecContext';

export type YupSpecProviderProps = React.PropsWithChildren<{
  schema?: unknown;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}>;

const resolveSchema = (schema: unknown): Schema | undefined => {
  if (schema instanceof Function) {
    return resolveSchema(schema());
  }

  if (schema instanceof Schema) {
    return schema;
  }

  if (isSchema(schema)) {
    return resolveSchema(schema.resolve({})) /* Lazy */;
  }
};

export function YupSpecProvider({
  isDisabled = false,
  isReadOnly = false,
  schema,
  children,
}: YupSpecProviderProps) {
  const ctx = useMemo<Spec>(() => {
    const resolvedSchema = resolveSchema(schema);
    const objectSchema = resolvedSchema instanceof ObjectSchema ? resolvedSchema : undefined;
    const getSchema = (path: string) => objectSchema && resolveSchema(reach(objectSchema, path));
    const getSpec = (path: string) => getSchema(path)?.spec;

    return {
      getSchema,
      label: (name, label) => label ?? getSpec(name)?.label ?? name,
      isNullable: (name, defaultIsNullable) => defaultIsNullable ?? getSpec(name)?.nullable,
      isDisabled: (_name, defaultIsDisabled) => isDisabled || defaultIsDisabled,
      isReadOnly: (_name, defaultIsReadOnly) => isReadOnly || defaultIsReadOnly,
      isRequired: (name, isRequired) => isRequired ?? getSpec(name)?.optional === false,
    };
  }, [schema, isDisabled, isReadOnly]);

  return <SpecContext.Provider value={ctx}>{children}</SpecContext.Provider>;
}
