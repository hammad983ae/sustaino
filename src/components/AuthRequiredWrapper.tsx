import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthRequiredWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthRequiredWrapper: React.FC<AuthRequiredWrapperProps> = ({ 
  children, 
  title = "Authentication Required",
  description = "Please sign in to access this feature"
}) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    // Simple demo login - in production you'd want a proper auth flow
    try {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error('Auth error:', error);
      }
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{description}</p>
          <div className="flex gap-2">
            <Button onClick={handleSignIn} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Sign In (Demo)
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This will create a temporary demo session for testing purposes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};