import { type Patient } from '@prisma/client';

export function formatPatientName(patient: Pick<Patient, 'firstName' | 'lastName' | 'givenName'>) {
  const parts = [patient.lastName, patient.firstName];

  if (patient.givenName) {
    parts.push(patient.givenName);
  }

  return parts.join(' ');
}
