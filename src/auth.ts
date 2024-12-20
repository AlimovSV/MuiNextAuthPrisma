import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import * as Yup from 'yup';

import { prisma } from '@/lib/prisma';

const CredentialsSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

/// https://medium.com/@pawanrijal/building-authentication-in-a-next-js-14-app-using-nextauth-and-prisma-59c9d67a0eca
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  debug: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async authorized({ auth }) {
      return auth?.user != null;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Имя пользователя',
          type: 'email',
          placeholder: 'example@example.com',
          value: 'root@root.root',
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введите пароль',
          value: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = CredentialsSchema.validateSync(credentials);
          const user = await prisma.user.findFirst({ where: { email } });

          if (user && bcrypt.compareSync(password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        } catch {
          // Nothing to do
        }
        return null;
      },
    }),
  ],
});
