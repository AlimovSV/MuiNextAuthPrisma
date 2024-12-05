import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

import { NextAuthOptions } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// https://medium.com/@pawanrijal/building-authentication-in-a-next-js-14-app-using-nextauth-and-prisma-59c9d67a0eca
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    async jwt({ token, user }) {
      console.log('JWT Callback', { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
          value: 'root@root.root',
        },
        password: {
          label: 'Password',
          type: 'password',
          value: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await CredentialsSchema.parseAsync(credentials);
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
};
