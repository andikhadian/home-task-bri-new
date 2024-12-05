'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createUserSchema, updateUserSchema } from '@/validations/user';
import { fetcher } from '@/lib/fetcher';
import { User } from '@/types/user';

export async function createUser(data: z.infer<typeof createUserSchema>) {
  const user = await fetcher<User | null>('/user', {
    method: 'POST',
    body: data,
  });

  if (!user) {
    throw new Error('Failed to create user');
  }

  redirect('/dashboard');
}

export async function updateUser(
  id: string,
  data: z.infer<typeof updateUserSchema>
) {
  const user = await fetcher<User | null>(`/user/${id}`, {
    method: 'PUT',
    body: data,
  });

  if (!user) {
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(id: string) {
  const user = await fetcher<User | null>(`/user/${id}`, {
    method: 'DELETE',
  });

  if (!user) {
    throw new Error('Failed to delete user');
  }
}
