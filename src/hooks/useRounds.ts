import { useState, useEffect, useCallback } from 'react';
import { roundsApi } from '../api/rounds';
import { roundsResource } from '../utils/RoundsResource';
import type { Round } from '../types';

export const useRounds = () => {
  const initialRounds = roundsResource.read();
  const [rounds, setRounds] = useState<Round[]>(initialRounds);

  const loadRounds = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    roundsResource.refresh().then((data) => {
      if (data) {
        setRounds(data);
      }
    }).catch(() => {
      console.error('Failed to load rounds');
    });

    const unsubscribe = roundsResource.subscribe(() => {
      const data = roundsResource.getData();
      if (data) {
        setRounds(data);
      }
    });

    return unsubscribe;
  }, []);

  const createRound = async (): Promise<Round> => {
    try {
      return await roundsApi.create();
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
