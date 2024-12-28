import { type Patient, type Photo } from '@prisma/client';
import { extension } from 'mime-types';

export function getPhotoUrl(photo: Pick<Photo, 'id' | 'patientId' | 'contentType'>) {
  return `/files/${photo.patientId}/${photo.id}.${extension(photo.contentType)}`;
}

export function formatPatientName(patient: Pick<Patient, 'firstName' | 'lastName' | 'givenName'>) {
  const parts = [patient.lastName, patient.firstName];

  if (patient.givenName) {
    parts.push(patient.givenName);
  }

  return parts.join(' ');
}
