export type StoredOrderItem = {
  slug: string;
  name: string;
  price: string;
  quantity: number;
  subtotal: number;
  subtotalFormatted: string;
};

export type StoredOrder = {
  id: string;
  email: string;
  createdAt: string;
  status: 'processing' | 'pending-fulfilment' | 'completed';
  total: number;
  totalFormatted: string;
  paymentMethod: string;
  paymentMethodId: string;
  paymentDetails?: Array<{ label: string; value: string }>;
  notes?: string;
  items: StoredOrderItem[];
};

export const ORDERS_STORAGE_KEY = 'bengalMeat:orders';

const hasWindow = () => typeof window !== 'undefined';

const readOrders = (): StoredOrder[] => {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch (error) {
    console.error('Failed to parse stored orders', error);
    return [];
  }
};

const writeOrders = (orders: StoredOrder[]) => {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to persist orders', error);
  }
};

export const appendOrder = (order: StoredOrder) => {
  const existing = readOrders();
  writeOrders([...existing, order]);
};

export const getOrdersForUser = (email: string): StoredOrder[] => {
  if (!email) return [];
  const normalized = email.toLowerCase();
  return readOrders()
    .filter((order) => order.email.toLowerCase() === normalized)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const overwriteOrdersForUser = (email: string, orders: StoredOrder[]) => {
  if (!email) return;
  const normalized = email.toLowerCase();
  const remaining = readOrders().filter((order) => order.email.toLowerCase() !== normalized);
  writeOrders([...remaining, ...orders]);
};

export const clearOrdersForUser = (email: string) => {
  if (!email) return;
  const normalized = email.toLowerCase();
  const remaining = readOrders().filter((order) => order.email.toLowerCase() !== normalized);
  writeOrders(remaining);
};
