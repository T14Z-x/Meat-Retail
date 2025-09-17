"use client";
import { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';

type User = {
  id: string;
  email: string;
} | null;

type AuthContextValue = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(null);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async signIn(email: string, _password: string) {
      // Placeholder: set a mock user. In real app, call an API that sets httpOnly JWT cookie.
      setUser({ id: 'demo', email });
    },
    async signOut() {
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

