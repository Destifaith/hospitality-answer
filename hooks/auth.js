import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from '../lib/axios';

export const useAuth = ({ middleware }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { data: user, error, mutate } = useSWR(
    '/api/v1/user',
    () => axios
      .get('/api/v1/user')
      .then(response => response.data.data)
      .catch(error => {
        if (error.response.status !== 409) {
          throw error;
        }
      })
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const login = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);
    axios
      .post('/login', props)
      .then(() => mutate() && router.push('/dashboard'))
      .catch(error => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout');
      mutate(null);
    }
    router.push('/login');
  };

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware === 'guest' && user) {
      router.push('/');
    }

    if (middleware === 'auth' && error) {
      router.push('/login');
    }
  }, [user, error, middleware, router]);

  return {
    user,
    csrf,
    isLoading,
    login,
    logout
  };
};