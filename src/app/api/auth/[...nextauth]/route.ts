import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        "email": { label: "Email", placeholder: "Your email", type: "email" },
        "password": { label: "Password", placeholder: "Your password", type: "password" }
      },
      async authorize(credentials) {
        console.log('authorize:', credentials)
        return null;
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
})

export { handler as GET, handler as POST }
