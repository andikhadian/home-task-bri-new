import { fetcher } from '@/lib/fetcher';
import { LoginUserResponse } from '@/types/user';

export async function loginWithCredentials(email: string, password: string) {
  return fetcher<LoginUserResponse | null>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}
