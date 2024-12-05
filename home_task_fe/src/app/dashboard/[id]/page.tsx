import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getUser } from '@/api-handler/user';
import { Title } from '@/components/header';
import { Button } from '@/components/ui/button';
import UserDetailForm from '@/app/component/users/detail-form';

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const user = await getUser({ id: params.id });

    return (
      <div>
        <Title>User Details</Title>
        <Button variant='outline' asChild className='mb-6'>
          <Link href='/dashboard'>Back</Link>
        </Button>
        <UserDetailForm initialUser={user} />
      </div>
    );
  } catch {
    notFound();
  }
}
