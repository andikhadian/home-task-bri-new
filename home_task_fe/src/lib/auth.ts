import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginWithCredentials } from '@/api-handler/auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const res = await loginWithCredentials(
          credentials.email as string,
          credentials.password as string
        );

        if (!res?.access_token) {
          return null;
        }

        return {
          access_token: res.access_token,
          ...res.user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.access_token = user.access_token;
        token.nama = user.nama;
        token.email = user.email!;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;
      session.user.nama = token.nama;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
