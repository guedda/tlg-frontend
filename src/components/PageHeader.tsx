import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PageHeaderProps {
  backLink?: {
    to: string;
    text: string;
  };
  title?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ backLink, title }) => {
  const { user, logout } = useAuthStore.getState();

  return (
    <header className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {backLink ? (
          <Link
            to={backLink.to}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors"
          >
            {backLink.text}
          </Link>
        ) : title ? (
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        ) : (
          <div></div>
        )}
        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base text-gray-700 font-medium">
            {user?.username}
          </span>
          <button
            onClick={logout}
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm md:text-base font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};
