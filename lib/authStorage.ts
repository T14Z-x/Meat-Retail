export type StoredUser = {
  email: string;
  password: string;
  businessName?: string;
  createdAt: string;
};

const USERS_KEY = 'bengalMeat:users';
const SESSION_KEY = 'bengalMeat:session';

const hasWindow = () => typeof window !== 'undefined';

const readUsers = (): StoredUser[] => {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse stored users', error);
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const saveUser = (user: StoredUser) => {
  const existing = readUsers().filter((u) => u.email.toLowerCase() !== user.email.toLowerCase());
  writeUsers([...existing, user]);
};

export const findUser = (email: string): StoredUser | undefined => {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const setSession = (email: string) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ email, signedInAt: new Date().toISOString() }));
};

export const clearSession = () => {
  if (!hasWindow()) return;
  window.localStorage.removeItem(SESSION_KEY);
};

export const getSession = (): { email: string; signedInAt: string } | null => {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to parse session', error);
    return null;
  }
};
