import React from 'react';
import { RoundStatus as RoundStatusConst } from '../types';
import type { Round } from '../types';

interface GooseImageProps {
  round: Round;
  tapping: boolean;
  onTap?: () => void;
}

export const GooseImage: React.FC<GooseImageProps> = ({ round, tapping, onTap }) => {
  const isClickable = round.status === RoundStatusConst.ACTIVE && !tapping;

  return (
    <div className="flex flex-col items-center mb-8">
      <div
        onClick={isClickable ? onTap : undefined}
        className={`text-xs md:text-sm font-mono text-gray-800 whitespace-pre leading-tight select-none ${
          isClickable
            ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all'
            : 'cursor-default'
        } ${tapping ? 'opacity-50' : ''}`}
      >
        {`
            ░░░░░░░░░░░░░░░
          ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
      ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
    ░░▒▒▒▒░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒▒▒░░
    ░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░
    ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░
      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░
            `}
      </div>
      {round.status === RoundStatusConst.ACTIVE && (
        <div className="mt-4 text-sm text-gray-600">
          {tapping ? 'Тапаю...' : 'Кликните на гуся, чтобы тапнуть!'}
        </div>
      )}
    </div>
  );
};
