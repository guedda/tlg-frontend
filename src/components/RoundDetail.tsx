import React from 'react';
import { useParams } from 'react-router-dom';
import { RoundStatus as RoundStatusConst } from '../types';
import { useRoundDetail } from '../hooks/useRoundDetail';
import { LoadingFallback } from './LoadingFallback';
import { GooseImage } from './GooseImage';
import { RoundResults } from './RoundResults';

export const RoundDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { round, loading, tapping, handleTap, getTimeRemaining, getStatusText } = useRoundDetail(id);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!round) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-red-600">Раунд не найден</div>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <GooseImage round={round} tapping={tapping} onTap={handleTap} />

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {getStatusText()}
            </div>

            {timeRemaining && (
              <div className="text-base md:text-lg text-gray-600 mb-4">
                {round.status === RoundStatusConst.COOLDOWN
                  ? `до начала раунда ${timeRemaining}`
                  : `До конца осталось: ${timeRemaining}`}
              </div>
            )}

            {round.status === RoundStatusConst.ACTIVE && round.userScore !== undefined && (
              <div className="text-base md:text-lg font-semibold text-gray-700 mb-4">
                Мои очки - {round.userScore}
              </div>
            )}
          </div>

          <RoundResults round={round} />
        </div>
      </div>
    </div>
  );
};
