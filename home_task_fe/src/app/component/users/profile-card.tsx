import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { LogoutButton } from '../logout-button';

export async function ProfileCard() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Nama: {session.user.nama}</p>
        <p>Email: {session.user.email}</p>
        <p>Role: {session.user.role === '1' ? 'Admin' : 'User'}</p>
      </CardContent>
      <CardFooter>
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
