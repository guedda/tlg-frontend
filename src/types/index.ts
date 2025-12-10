export const UserRole = {
  SURVIVOR: 'SURVIVOR',
  ADMIN: 'ADMIN',
  NIKITA: 'NIKITA',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface TapResponse {
  tapId: string;
  totalTaps: number;
  score: number;
}
