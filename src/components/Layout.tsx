import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageHeader } from './PageHeader';

export const Layout: React.FC = () => {
  const location = useLocation();
  
  const getHeaderProps = () => {
    if (location.pathname.startsWith('/rounds/') && location.pathname !== '/rounds') {
      return {
        backLink: { to: '/rounds', text: '← Раунды' }
      };
    } else if (location.pathname === '/rounds') {
      return {
        title: 'Список раундов'
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 md:py-8 font-sans">
      <div className='w-full mx-auto'>
        <PageHeader {...getHeaderProps()} />
        <Outlet />
      </div>
    </div>
  );
};
