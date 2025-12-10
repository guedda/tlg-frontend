import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { useAuthStore } from '../store/authStore';
import { useRounds } from '../hooks/useRounds';
import { formatDate, getStatusText } from '../utils/roundUtils';

export const RoundsList: React.FC = () => {
  const { rounds, createRound } = useRounds();
  const { user } = useAuthStore.getState();
  const navigate = useNavigate();
  
  const handleCreateRound = async () => {
    const newRound = await createRound();
    navigate(`/rounds/${newRound.id}`);
  };

  return (
    <>
      {user?.role === UserRole.ADMIN && (
          <div className="mb-6">
            <button
              onClick={handleCreateRound}
              className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Создать раунд
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rounds.map((round) => (
            <Link
              key={round.id}
              to={`/rounds/${round.id}`}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            >
              <div className="mb-3">
                <div className="text-sm md:text-base font-semibold text-gray-800 mb-2">
                  ● Round ID: {round.id}
                </div>
                <div className="space-y-1 text-xs md:text-sm text-gray-600">
                  <div>Start: {formatDate(round.startDate)}</div>
                  <div>End: {formatDate(round.endDate)}</div>
                </div>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="text-sm md:text-base font-medium text-gray-700">
                {getStatusText(round.status)}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};
