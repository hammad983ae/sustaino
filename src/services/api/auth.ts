import { supabase } from '@/integrations/supabase/client';
import { handleApiResponse, handleSingleApiResponse } from './base';

export interface Profile {
  id: string;
  user_id: string;
  display_name?: string;
  company_name?: string;
  professional_license?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  displayName?: string;
}

class AuthService {
  async signIn(credentials: SignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signUp(credentials: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          display_name: credentials.displayName
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw new Error(error.message);
    }
  }

  async getProfile(): Promise<Profile | null> {
    const response = await supabase
      .from('profiles')
      .select('*')
      .single();
    
    if (response.error) {
      if (response.error.code === 'PGRST116') {
        // No profile found
        return null;
      }
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async createProfile(profileData: Partial<Profile>): Promise<Profile> {
    const response = await supabase
      .from('profiles')
      .insert(profileData as any)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Profile;
  }

  async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    const response = await supabase
      .from('profiles')
      .update(profileData as any)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Profile;
  }
}

export const authService = new AuthService();