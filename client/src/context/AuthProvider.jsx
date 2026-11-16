import { useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { isTokenValid, loginRequest, signupRequest } from '@/pages/auth/auth';

const USER_KEY = 'bl-user';
const TOKEN_KEY = 'bl-token';

// "Remember me" saves to localStorage (stays after closing the browser),
// otherwise sessionStorage (gone when the tab closes). Read whichever has it.
function readSaved(key) {
  return localStorage.getItem(key) ?? sessionStorage.getItem(key);
}

function clearSaved() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem(USER_KEY);
    storage.removeItem(TOKEN_KEY);
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = readSaved(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => readSaved(TOKEN_KEY));

  // Once, when the app opens: if a token was saved, ask the server if it still works.
  // If it expired, log out, so ProtectedRoute sends the user to /login.
  useEffect(() => {
    const savedToken = readSaved(TOKEN_KEY);
    if (!savedToken) return;

    let cancelled = false;
    isTokenValid(savedToken)
      .then((valid) => {
        if (!valid && !cancelled) {
          clearSaved();
          setUser(null);
          setToken(null);
        }
      })
      .catch(() => {}); // offline or server down: keep the user, don't log them out

    return () => {
      cancelled = true;
    };
  }, []);

  // Register returns no token (the instructor's API), so the user is saved without one.
  async function register({ name, email, password }) {
    const newUser = await signupRequest({ name, email, password });
    clearSaved();
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setToken(null);
    return newUser;
  }

  async function login({ identifier, password, remember }) {
    const { user: loggedIn, token: newToken } = await loginRequest({ identifier, password });
    clearSaved();
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(USER_KEY, JSON.stringify(loggedIn));
    if (newToken) storage.setItem(TOKEN_KEY, newToken);
    setUser(loggedIn);
    setToken(newToken);
    return loggedIn;
  }

  function logout() {
    clearSaved();
    setUser(null);
    setToken(null);
  }

  return <AuthContext value={{ user, token, login, logout, register }}>{children}</AuthContext>;
}
