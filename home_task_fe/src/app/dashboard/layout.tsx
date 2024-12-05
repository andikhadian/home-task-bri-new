import React, { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileCard } from '../component/users/profile-card';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>User Dashboard</h1>
      <div className='grid grid-cols-3 gap-4'>
        <ProfileCard />
        <Card className='col-span-2'>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
