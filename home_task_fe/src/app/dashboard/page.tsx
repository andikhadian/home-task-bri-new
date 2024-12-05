import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoutButton } from '../component/logout-button';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // Admin dashboard
  if (session.user.role === '1') {
    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-2'>
                <Button asChild>
                  <Link href='/users'>List Users</Link>
                </Button>
                <Button asChild>
                  <Link href='/users/create'>Create User</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {session.user.email}</p>
              <p>Role: Admin</p>
            </CardContent>
            <CardFooter>
              <LogoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // User dashboard
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>User Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {session.user.email}</p>
          <p>Role: User</p>
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
