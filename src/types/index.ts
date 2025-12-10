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

export const RoundStatus = {
  COOLDOWN: 'cooldown',
  ACTIVE: 'active',
  FINISHED: 'finished',
} as const;

export type RoundStatus = typeof RoundStatus[keyof typeof RoundStatus];

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Round {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: RoundStatus;
  userScore?: number;
  totalTaps: number;
  winner: {
    username: string;
    score: number;
  } | null;
}
