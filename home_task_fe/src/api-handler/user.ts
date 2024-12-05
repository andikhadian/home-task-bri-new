import { GetUsersResponse } from '@/types/user';
import { serializeUsersQueryParams } from '@/hooks/use-users-search-params';
import { fetcher } from '@/lib/fetcher';

export async function getUsers(p: {
  q?: string | null;
  page?: number | null;
  limit?: number | null;
  signal?: AbortSignal;
}) {
  const queryParams = serializeUsersQueryParams(p);
  return fetcher<GetUsersResponse | null>(`/user${queryParams}`, {
    signal: p.signal,
  });
}
