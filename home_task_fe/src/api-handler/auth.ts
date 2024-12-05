import { LoginUser } from '@/types/user';
import { BASE_URL } from './config';

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<LoginUser | null> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return null;

  return res.json();
}
