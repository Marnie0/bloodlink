import { useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { loginRequest, signupRequest } from '@/pages/auth/auth';

const STORAGE_KEY = 'bl-user';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  async function register({ name, email, password }) {
    const newUser = await signupRequest({ name, email, password });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }

  async function login({ identifier, password, remember }) {
    const loggedIn = await loginRequest({ identifier, password, remember });
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
    setUser(loggedIn);
    return loggedIn;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return <AuthContext value={{ user, login, logout, register }}>{children}</AuthContext>;
}
