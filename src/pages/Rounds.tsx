import { Suspense } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RoundsList } from '../components/RoundsList';

const RoundsLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg text-gray-600">Загрузка...</div>
  </div>
);

const Rounds: React.FC = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<RoundsLoadingFallback />}>
        <RoundsList />
      </Suspense>
    </ProtectedRoute>
  );
};

export default Rounds;
