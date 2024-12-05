'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUserSchema } from '@/validations/user';
import { z } from 'zod';
import { User } from '@/types/user';
import { updateUser } from '@/actions/user-actions';
import { useToast } from '@/hooks/use-toast';

interface Props {
  initialUser: User;
}

export default function UserDetailForm({ initialUser }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nama: initialUser.nama,
      email: initialUser.email,
      pic: initialUser.pic,
    },
  });

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    startTransition(async () => {
      try {
        await updateUser(initialUser.id, data);

        toast({
          title: 'User Updated',
          description: 'User has been successfully updated',
        });

        router.refresh();
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error Updating User',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='nama'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter nama' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type='email' placeholder='Enter email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIC</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter PIC' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <FormLabel>Role</FormLabel>
            <Input
              value={initialUser.role === '1' ? 'Admin' : 'User'}
              disabled
            />
          </div>
          <div>
            <FormLabel>Created At</FormLabel>
            <Input value={initialUser.created_at} disabled />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Input
            type='checkbox'
            checked={initialUser.is_active}
            disabled
            className='h-4 w-4'
          />
          <span>{initialUser.is_active ? 'Active' : 'Inactive'}</span>
        </div>
        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Changes'}
        </Button>
      </form>
    </Form>
  );
}
