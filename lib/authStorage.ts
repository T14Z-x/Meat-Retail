export type StoredUser = {
  email: string;
  password: string;
  businessName?: string;
  businessType?: string;
  tradeLicense?: string;
  yearsOperating?: string;
  onlinePresence?: string;
  contactName?: string;
  contactRole?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  contactTime?: string;
  deliveryAddress?: string;
  area?: string;
  division?: string;
  district?: string;
  postalCode?: string;
  deliveryWindow?: string;
  coldStorage?: string;
  hasHalal?: boolean;
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

type SessionRecord = {
  email: string;
  signedInAt: string;
  name?: string;
};

export const setSession = (session: { email: string; name?: string }) => {
  if (!hasWindow()) return;
  const record: SessionRecord = {
    email: session.email,
    name: session.name,
    signedInAt: new Date().toISOString(),
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(record));
};

export const clearSession = () => {
  if (!hasWindow()) return;
  window.localStorage.removeItem(SESSION_KEY);
};

export const getSession = (): SessionRecord | null => {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as SessionRecord;
  } catch (error) {
    console.error('Failed to parse session', error);
    return null;
  }
};
