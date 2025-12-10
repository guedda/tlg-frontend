import { Suspense } from 'react';
import { RoundDetail } from '../components/RoundDetail';
import { LoadingFallback } from '../components/LoadingFallback';

const Round: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RoundDetail />
    </Suspense>
  );
};

export default Round;
