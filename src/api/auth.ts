import apiClient from './client';
import type { LoginRequest, LoginResponse } from '../types';
import { useAuthStore } from '../store/authStore';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const { login } = useAuthStore.getState();
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    if (response.data.token && response.data.user) {
      login(response.data.user, response.data.token);
    }
    return response.data;
  },
};

