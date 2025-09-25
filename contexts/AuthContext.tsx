"use client";
import { createContext, useContext, useMemo, useState, PropsWithChildren, useEffect } from 'react';
import { clearSession, getSession, setSession } from '../lib/authStorage';

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextValue = {
  user: User;
  signIn: (email: string, options?: { name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const existing = getSession();
    if (existing?.email) {
      setUser({ id: existing.email, email: existing.email, name: existing.name });
    }

    const syncFromStorage = () => {
      const session = getSession();
      if (session?.email) {
        setUser({ id: session.email, email: session.email, name: session.name });
      } else {
        setUser(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', syncFromStorage);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', syncFromStorage);
      }
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async signIn(email: string, options) {
      const name = options?.name;
      setSession({ email, name });
      setUser({ id: email, email, name });
    },
    async signOut() {
      clearSession();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
