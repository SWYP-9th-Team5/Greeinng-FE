'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthInit() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) login(token);
  }, [login]);

  return null;
}
