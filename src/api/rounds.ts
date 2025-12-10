import apiClient from './client';
import type { Round, TapResponse } from '../types';

export const roundsApi = {
  getAll: async (): Promise<Round[]> => {
    const response = await apiClient.get<Round[]>('/rounds');
    return response.data;
  },

  getById: async (id: string): Promise<Round> => {
    const response = await apiClient.get<Round>(`/rounds/${id}`);
    return response.data;
  },

  create: async (): Promise<Round> => {
    const response = await apiClient.post<Round>('/rounds');
    return response.data;
  },

  tap: async (roundId: string): Promise<TapResponse> => {
    const response = await apiClient.post<TapResponse>(`/rounds/${roundId}/tap`);
    return response.data;
  },
};

