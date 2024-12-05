import { GetUsersResponse, User } from '@/types/user';
import { fetcher } from '@/lib/fetcher';

export async function getUsers(p: {
  queryParamsAsString: string;
  signal?: AbortSignal;
}) {
  return fetcher<GetUsersResponse | null>(`/user${p.queryParamsAsString}`, {
    signal: p.signal,
  });
}

export async function getUser(p: { id: string; signal?: AbortSignal }) {
  return fetcher<User | null>(`/user/${p.id}`, {
    signal: p.signal,
  });
}
