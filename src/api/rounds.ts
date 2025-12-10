import apiClient from './client';
import type { Round } from '../types';

export const roundsApi = {
  getAll: async (): Promise<Round[]> => {
    const response = await apiClient.get<Round[]>('/rounds');
    return response.data;
  },

  create: async (): Promise<Round> => {
    const response = await apiClient.post<Round>('/rounds');
    return response.data;
  },
};

