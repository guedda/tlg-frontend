import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      navigate('/rounds', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authApi.login({ username, password });
      navigate('/rounds');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Ошибка входа');
      } else {
        setError('Ошибка входа');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    handleSubmit,
  };
};
