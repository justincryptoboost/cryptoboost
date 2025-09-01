export interface User {
  id: string;
  email: string;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
  balance_eur: number;
  kyc_status: 'pending' | 'approved' | 'rejected';
  last_login?: string;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  price_eur: number;
  change_24h: number;
  updated_at: string;
}

export interface InvestmentPack {
  id: string;
  name: string;
  description: string;
  min_amount: number;
  max_amount: number;
  estimated_roi: number;
  duration_months: number;
  risk_level: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'exchange' | 'roi';
  amount_eur: number;
  crypto_symbol?: string;
  crypto_amount?: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  type: 'system' | 'personal';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_at: string;
  author: string;
  tags: string[];
}