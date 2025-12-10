import { useState, useEffect, useCallback } from 'react';
import { roundsApi } from '../api/rounds';
import type { Round } from '../types';
import { RoundStatus as RoundStatusConst } from '../types';
import { AxiosError } from 'axios';

export const useRoundDetail = (id: string | undefined) => {
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);
  const [tapping, setTapping] = useState(false);

  const loadRound = useCallback(async () => {
    if (!id) return;
    try {
      const data = await roundsApi.getById(id);
      setRound(data);
    } catch (err) {
      console.error('Failed to load round', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    loadRound();

    let intervalId: number | null = setInterval(() => {
      setRound((currentRound) => {
        if (currentRound?.status === RoundStatusConst.FINISHED) {
          if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
          }
          return currentRound;
        }
        loadRound();
        return currentRound;
      });
    }, 1000);

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [id, loadRound]);

  const handleTap = async () => {
    if (!id || !round || round.status !== RoundStatusConst.ACTIVE || tapping) return;

    setTapping(true);
    try {
      await roundsApi.tap(id);
      await loadRound();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data?.message || 'Ошибка при тапе');
      } else {
        console.error('Ошибка при тапе');
      }
    } finally {
      setTapping(false);
    }
  };

  const getTimeRemaining = () => {
    if (!round) return null;

    const now = new Date();
    let targetDate: Date;

    if (round.status === RoundStatusConst.COOLDOWN) {
      targetDate = new Date(round.startDate);
    } else if (round.status === RoundStatusConst.ACTIVE) {
      targetDate = new Date(round.endDate);
    } else {
      return null;
    }

    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return null;

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (!round) return '';
    switch (round.status) {
      case RoundStatusConst.ACTIVE:
        return 'Раунд активен!';
      case RoundStatusConst.COOLDOWN:
        return 'Cooldown';
      case RoundStatusConst.FINISHED:
        return 'Раунд завершен';
      default:
        return '';
    }
  };

  return {
    round,
    loading,
    tapping,
    handleTap,
    getTimeRemaining,
    getStatusText,
  };
};
