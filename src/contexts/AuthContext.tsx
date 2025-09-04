import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, acceptedTerms: boolean) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'client@demo.com',
    role: 'client',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    balance_eur: 5000,
    kyc_status: 'approved',
  },
  {
    id: 'admin-1',
    email: 'admin@demo.com',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    balance_eur: 0,
    kyc_status: 'approved',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      // Use Supabase auth
      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSupabaseUser(session.user);
          // Fetch user profile from database
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser(profile);
          }
        }
        setLoading(false);
      };

      getSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setSupabaseUser(session.user);
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setUser(profile);
            }
          } else {
            setSupabaseUser(null);
            setUser(null);
          }
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    } else {
      // Use mock auth
      const savedUser = localStorage.getItem('cryptoboost-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: error.message } : {};
    } else {
      // Mock authentication
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && password === 'demo123') {
        setUser(mockUser);
        localStorage.setItem('cryptoboost-user', JSON.stringify(mockUser));
        return {};
      }
      return { error: 'Email ou mot de passe incorrect' };
    }
  };

  const signUp = async (email: string, password: string, acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      return { error: 'Vous devez accepter les conditions générales' };
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation
        }
      });
      return error ? { error: error.message } : {};
    } else {
      // Mock registration
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        role: 'client',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        balance_eur: 0,
        kyc_status: 'pending',
      };
      
      setUser(newUser);
      localStorage.setItem('cryptoboost-user', JSON.stringify(newUser));
      return {};
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('cryptoboost-user');
      setUser(null);
    }
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return error ? { error: error.message } : {};
    } else {
      // Mock password reset
      return {};
    }
  };

  const updatePassword = async (newPassword: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      return error ? { error: error.message } : {};
    } else {
      // Mock password update
      return {};
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
