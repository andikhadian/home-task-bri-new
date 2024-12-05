import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/header';

import { UsersList } from '../component/users/list';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== '1') {
    return null;
  }

  return (
    <div>
      <Title>User Management</Title>
      <Button asChild className='mb-6'>
        <Link href='/dashboard/create'>Create User</Link>
      </Button>
      <UsersList />
    </div>
  );
}
