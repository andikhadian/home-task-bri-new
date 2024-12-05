import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      nama: string;
      email: string;
      role: string;
    };
  }

  interface User {
    id: string;
    access_token: string;
    nama: string;
    email: string;
    role: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    access_token: string;
    nama: string;
    email: string;
    role: string;
  }
}
