import React from 'react';
import { useLogin } from '../hooks/useLogin';

export const Login: React.FC = () => {
  const {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-50 px-4 md:px-6 font-sans">
      <div className="w-full md:max-w-md bg-white rounded-lg md:shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ВОЙТИ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

