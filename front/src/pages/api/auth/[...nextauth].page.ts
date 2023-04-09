import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from "next-auth/providers/line";
import { prisma } from 'src/config/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async redirect({ baseUrl }) {

      return baseUrl;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: false,
  events: {},
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID|| '',
      clientSecret: process.env.LINE_CLIENT_SECRET|| '',
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    strategy: 'database',
    updateAge: 60 * 60 * 24, // 24 hours
  },
  useSecureCookies: process.env.NODE_ENV === 'production', // NO HTTPS IN DEV
};

export default NextAuth(authOptions);
