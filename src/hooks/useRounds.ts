import { useState, useEffect } from 'react';
import { roundsApi } from '../api/rounds';
import { roundsResource } from '../utils/RoundsResource';
import type { Round } from '../types';

export const useRounds = () => {
  const initialRounds = roundsResource.read();
  const [rounds, setRounds] = useState<Round[]>(initialRounds);

  useEffect(() => {
    const unsubscribe = roundsResource.subscribe(() => {
      const data = roundsResource.getData();
      if (data) {
        setRounds(data);
      }
    });

    return unsubscribe;
  }, []);

  const loadRounds = async () => {
    try {
      await roundsResource.refresh();
      const data = roundsResource.getData();
      if (data) {
        setRounds(data);
      }
    } catch (err) {
      console.error('Failed to load rounds', err);
      throw err;
    }
  };

  const createRound = async () => {
    try {
      await roundsApi.create();
      await loadRounds();
    } catch (err) {
      console.error('Failed to create round', err);
      throw err;
    }
  };

  return {
    rounds,
    createRound,
    loadRounds,
  };
};
