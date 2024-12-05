'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';
import { createUser } from '@/actions/user-actions';
import { Title } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { createUserSchema } from '@/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreatePage() {
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      nama: '',
      email: '',
      password: '',
      role: '2',
      pic: '',
      is_active: true,
    },
  });

  function onSubmit(values: z.infer<typeof createUserSchema>) {
    startTransition(async () => {
      try {
        console.log('values', values);
        await createUser(values);

        toast({
          title: 'User Created',
          description: 'User has been successfully created',
        });

        form.reset();
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error Creating User',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
        });
      }
    });
  }

  return (
    <div>
      <Title>Create User</Title>
      <Button variant='outline' asChild className='mb-6'>
        <Link href='/dashboard'>Back</Link>
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='nama'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name' {...field} />
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
                  <Input placeholder='Enter email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='1'>Admin</SelectItem>
                    <SelectItem value='2'>User</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input placeholder='Enter PIC' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='is_active'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between'>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
