import { createClient } from '@supabase/supabase-js';

// Check if we're in mock mode
const isMockMode = import.meta.env.VITE_MOCK === 'true' || 
                   !import.meta.env.VITE_SUPABASE_URL || 
                   !import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client (only if not in mock mode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = isMockMode ? null : createClient(supabaseUrl, supabaseAnonKey);

// Mock data for offline/demo mode
export const mockUsers = [
  {
    email: 'viewer@vite.co.in',
    password: 'pass123',
    id: 'mock-user-1',
    name: 'Demo User'
  }
];

export const mockSalesData = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 3800 },
  { month: 'Mar', sales: 5100 },
  { month: 'Apr', sales: 4600 },
  { month: 'May', sales: 5800 },
  { month: 'Jun', sales: 6200 }
];

export const mockTransactions = [
  { id: 1, date: '2024-06-15', product: 'Laptop Pro', category: 'Electronics', amount: 1299 },
  { id: 2, date: '2024-06-14', product: 'Office Chair', category: 'Furniture', amount: 349 },
  { id: 3, date: '2024-06-13', product: 'Wireless Mouse', category: 'Electronics', amount: 49 },
  { id: 4, date: '2024-06-12', product: 'Desk Lamp', category: 'Furniture', amount: 79 },
  { id: 5, date: '2024-06-11', product: 'Keyboard', category: 'Electronics', amount: 129 },
  { id: 6, date: '2024-06-10', product: 'Monitor Stand', category: 'Furniture', amount: 59 },
  { id: 7, date: '2024-06-09', product: 'USB Hub', category: 'Electronics', amount: 39 },
  { id: 8, date: '2024-06-08', product: 'Phone Case', category: 'Accessories', amount: 25 }
];

// Helper function to validate credentials (mock mode)
export const validateMockCredentials = (email: string, password: string) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  return user ? { success: true, user } : { success: false, user: null };
};

// Helper function to check if we're in mock mode
export const isInMockMode = () => isMockMode;
