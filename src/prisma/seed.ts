import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userRoot = {
  id: 'cm4mhxim10004trrja87uep9n',
  name: 'root',
  email: 'root@root.root',
  password: 'password',
};

const userData = [userRoot] satisfies Prisma.UserCreateInput[];

const patientIvanov = {
  id: 'cm4jz5qne000058rj7sp50096',
  lastName: 'Иванов',
  firstName: 'Иван',
  givenName: 'Иванович',
};

const patientPetrov = {
  id: 'cm4jz669o000258rj5jwfd6e8',
  lastName: 'Петров',
  firstName: 'Петр',
  givenName: 'Петрович',
};

const patientSidorov: Prisma.PatientCreateInput = {
  id: 'cm4jz6005000158rj0wn10if9',
  lastName: 'Сидоров',
  firstName: 'Сидор',
  givenName: 'Сидорович',
};

const patientData = [
  patientIvanov,
  patientPetrov,
  patientSidorov,
] satisfies Prisma.PatientCreateInput[];

const photoData = [
  {
    id: 'cm4mhqpg40000trrj1sa4g19q',
    user: {
      connect: {
        id: userRoot.id,
      },
    },
    patient: {
      connect: {
        id: patientIvanov.id,
      },
    },
    contentType: 'image/jpeg',
  },
  {
    id: 'cm4mhqvlf0001trrjhgv26zk2',
    user: {
      connect: {
        id: userRoot.id,
      },
    },
    patient: {
      connect: {
        id: patientIvanov.id,
      },
    },
    contentType: 'image/jpeg',
  },
  {
    id: 'cm4mhr07a0002trrj6nighf94',
    user: {
      connect: {
        id: userRoot.id,
      },
    },
    patient: {
      connect: {
        id: patientPetrov.id,
      },
    },
    contentType: 'image/jpeg',
  },
  {
    id: 'cm4mhr46k0003trrja8zc1eg4',
    user: {
      connect: {
        id: userRoot.id,
      },
    },
    patient: {
      connect: {
        id: patientSidorov.id,
      },
    },
    contentType: 'image/jpeg',
  },
] satisfies Prisma.PhotoCreateInput[];

async function main() {
  console.log(`Start seeding ...`);
  for (const { id, name, email, password: plainPassword } of userData) {
    const password = bcrypt.hashSync(plainPassword, 10);
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        name,
        password,
        updatedAt: new Date(),
      },
      create: {
        id,
        name,
        email,
        password,
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const { id, firstName, lastName, givenName } of patientData) {
    const user = await prisma.patient.upsert({
      where: { id },
      update: {
        firstName,
        lastName,
        givenName,
        updatedAt: new Date(),
      },
      create: {
        id,
        firstName,
        lastName,
        givenName,
      },
    });
    console.log(`Created patient with id: ${user.id}`);
  }
  for (const { id, user, patient, contentType } of photoData) {
    const photo = await prisma.photo.upsert({
      where: { id },
      update: {
        user,
        patient,
        updatedAt: new Date(),
      },
      create: {
        id,
        user,
        patient,
        contentType,
      },
    });
    console.log(`Created photo with id: ${photo.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
