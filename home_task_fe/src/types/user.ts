export interface User {
  id: string;
  nama: string;
  email: string;
  role: '1' | '2';
  pic: string;
  is_active: boolean;
  created_at?: string;
}

export interface LoginUserResponse {
  access_token: string;
  user: User;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  total_pages: number;
  page: number;
  limit: number;
}
