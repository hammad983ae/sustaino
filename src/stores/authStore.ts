import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,

  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),

  setSession: (session) => set({ 
    session, 
    user: session?.user || null,
    isAuthenticated: !!session?.user 
  }),

  setLoading: (loading) => set({ loading }),

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        isAuthenticated: false,
        loading: false 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ loading: false });
    }
  },

  initialize: async () => {
    try {
      set({ loading: true });
      
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      set({ 
        session, 
        user: session?.user || null,
        isAuthenticated: !!session?.user 
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({ 
          session, 
          user: session?.user || null,
          isAuthenticated: !!session?.user 
        });
      });

    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));