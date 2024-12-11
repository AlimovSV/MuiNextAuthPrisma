import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'root',
    email: 'root@root.root',
    password: 'password',
  },
] satisfies Prisma.UserCreateInput[];

const patientData = [
  {
    id: 'cm4jz5qne000058rj7sp50096',
    lastName: 'Иванов',
    firstName: 'Иван',
    givenName: 'Иванович',
  },
  {
    id: 'cm4jz6005000158rj0wn10if9',
    lastName: 'Петров',
    firstName: 'Петр',
    givenName: 'Петрович',
  },
  {
    id: 'cm4jz669o000258rj5jwfd6e8',
    lastName: 'Сидоров',
    firstName: 'Сидор',
    givenName: 'Сидорович',
  },
] satisfies Prisma.PatientCreateInput[];

async function main() {
  console.log(`Start seeding ...`);
  for (const { name, email, password: plainPassword } of userData) {
    const password = bcrypt.hashSync(plainPassword, 10);
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password,
        updatedAt: new Date(),
      },
      create: {
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
        firstName,
        lastName,
        givenName,
      },
    });
    console.log(`Created patient with id: ${user.id}`);
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
