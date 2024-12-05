import { z } from 'zod';

export const createUserSchema = z.object({
  nama: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name must contain only alphabets' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['1', '2']),
  pic: z
    .string()
    .min(2, { message: 'PIC must be at least 2 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'PIC must contain only alphabets' }),
  is_active: z.boolean(),
});

export const updateUserSchema = z.object({
  nama: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name must contain only alphabets' }),

  email: z.string().email({ message: 'Invalid email address' }),

  pic: z
    .string()
    .min(2, { message: 'PIC must be at least 2 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'PIC must contain only alphabets' }),
});
