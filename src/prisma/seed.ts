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
