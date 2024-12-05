export interface User {
  id: string;
  nama: string;
  email: string;
  role: '1' | '2';
  pic: string;
  is_active: boolean;
  created_at?: string;
}

export interface LoginUser {
  access_token: string;
  user: User;
}
