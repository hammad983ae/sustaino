import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear ALL localStorage data to prevent data persistence
      const keysToRemove = [
        'propertyAddressData',
        'propertyTypeData', 
        'propertyJobNumber',
        'report_section_data',
        'continue_report_data',
        'report_data',
        'report_current_section'
      ];
      
      // Remove specific keys
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Also remove any autosave keys (they start with 'autosave_')
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('autosave_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear any session storage as well
      sessionStorage.clear();
      
      // Force a page reload to ensure all state is cleared
      window.location.href = '/';
      
      toast({
        title: "Signed out successfully",
        description: "All data has been cleared and you have been logged out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out", 
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (!user) {
    return (
      <Button onClick={() => navigate('/auth')} variant="outline" size="sm">
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Button>
    );
  }

  const initials = user.user_metadata?.display_name 
    ? user.user_metadata.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">
              {user.user_metadata?.display_name || user.email}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/work-hub')}>
          <UserIcon className="mr-2 h-4 w-4" />
          Work Hub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/property-valuations')}>
          <Settings className="mr-2 h-4 w-4" />
          Manage Valuations
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/white-label')}>
          <Settings className="mr-2 h-4 w-4" />
          White Label Config
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}