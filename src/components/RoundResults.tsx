import React from 'react';
import type { Round } from '../types';
import { RoundStatus as RoundStatusConst } from '../types';

interface RoundResultsProps {
  round: Round;
}

export const RoundResults: React.FC<RoundResultsProps> = ({ round }) => {
  if (round.status !== RoundStatusConst.FINISHED) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-6 space-y-4">
      <div className="flex justify-between items-center py-2">
        <span className="text-sm md:text-base text-gray-700 font-medium">Всего кликов:</span>
        <span className="text-sm md:text-base text-gray-900 font-semibold">
          {round.totalTaps || 0}
        </span>
      </div>
      {round.winner && round.winner.score > 0 && (
        <div className="flex justify-between items-center py-2">
          <span className="text-sm md:text-base text-gray-700 font-medium">
            Победитель - {round.winner.username}
          </span>
          <span className="text-sm md:text-base text-gray-900 font-semibold">
            {round.winner.score}
          </span>
        </div>
      )}
      {round.userScore !== undefined && (
        <div className="flex justify-between items-center py-2">
          <span className="text-sm md:text-base text-gray-700 font-medium">Мои очки</span>
          <span className="text-sm md:text-base text-gray-900 font-semibold">
            {round.userScore}
          </span>
        </div>
      )}
    </div>
  );
};
