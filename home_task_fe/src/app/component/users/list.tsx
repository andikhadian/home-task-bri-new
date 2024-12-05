'use client';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Loader2 } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getUsers } from '@/api-handler/user';
import {
  serializeUsersQueryParams,
  useUsersQueryParams,
} from '@/hooks/use-users-search-params';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { DeleteButton } from './delete-button';

export function UsersList() {
  const [queryParams, setQueryParams] = useUsersQueryParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['get-users', queryParams],
    queryFn: (ctx) =>
      getUsers({
        queryParamsAsString: serializeUsersQueryParams(queryParams),
        signal: ctx.signal,
      }),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({
      page: 1,
      q: event.target.value,
    });
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({
      page: 1,
      limit: event.target.valueAsNumber ?? 1,
    });
  };

  const handlePageChange = (page: number) => {
    setQueryParams({ page: page + 1 });
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Input
            type='search'
            placeholder='Search users...'
            className='max-w-sm'
            value={queryParams.q ?? undefined}
            onChange={handleSearch}
          />
        </div>
        <div className='w-32'>
          <Input
            type='number'
            min='1'
            placeholder='Limit'
            value={queryParams.limit}
            onChange={handleLimitChange}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className='h-24 text-center'>
                <div className='flex items-center justify-center'>
                  <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
                  <span className='ml-2'>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={7} className='h-24 text-center text-red-500'>
                Error fetching users. Please try again later.
              </TableCell>
            </TableRow>
          ) : !data?.data.length ? (
            <TableRow>
              <TableCell colSpan={7} className='h-24 text-center text-gray-500'>
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nama}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role === '1' ? 'Admin' : 'User'}</TableCell>
                <TableCell>{user.pic}</TableCell>
                <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button asChild size='sm' variant='outline'>
                      <Link href={`/dashboard/${user.id}`}>Detail</Link>
                    </Button>
                    <DeleteButton userId={user.id} onUserDeleted={refetch} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {!isLoading && !isError && Boolean(data?.data?.length) && (
        <Pagination>
          <PaginationContent>
            {[...Array(data?.total_pages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => handlePageChange(i)}
                  isActive={queryParams.page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
