import {
  parseAsString,
  parseAsInteger,
  createSerializer,
  useQueryStates,
} from 'nuqs';

const usersQueryParams = {
  q: parseAsString,
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
};

export const serializeUsersQueryParams = createSerializer(usersQueryParams);

export function useUsersQueryParams() {
  return useQueryStates(usersQueryParams);
}
