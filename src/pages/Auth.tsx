import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for password reset token in URL
    const checkPasswordReset = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user && !isResettingPassword) {
        navigate('/');
        return;
      }

      // Check for recovery/reset token in URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');

      if (type === 'recovery' && accessToken && refreshToken) {
        setIsResettingPassword(true);
        return;
      }
    };

    checkPasswordReset();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsResettingPassword(true);
      } else if (session?.user && !isResettingPassword) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isResettingPassword]);

  // Email form state
  const [email, setEmail] = useState('john@delorenzopropertygroup.com');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // For now, just show a message that password login is disabled
      setError('Password authentication is currently disabled. Please contact your administrator for access.');
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setError(error.message);
        return;
      }

      toast({
        title: "Password updated successfully!",
        description: "You can now sign in with your new password.",
      });

      setIsResettingPassword(false);
      setNewPassword('');
      setConfirmNewPassword('');
      
      // Clear the URL hash
      window.history.replaceState(null, '', window.location.pathname);
      
    } catch (error) {
      console.error('Password update error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              {/* DeLorenzo Property Group Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 transform rotate-45 relative">
                    <div className="absolute inset-2 bg-gradient-to-tl from-emerald-400 to-emerald-500 transform -rotate-45"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-600 to-amber-700 transform rotate-45"></div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-700 tracking-tight">DELORENZO</div>
                  <div className="text-lg font-medium text-slate-500 tracking-wide">PROPERTY GROUP</div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isResettingPassword ? 'Reset Your Password' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isResettingPassword ? 'Enter your new password below' : 'Sign in to access your property management platform'}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              {isResettingPassword ? 'Update Password' : 'Authentication'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <>
              {isResettingPassword ? (
                // Password Reset Form
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-new-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm your new password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                          minLength={6}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Updating password...' : 'Update Password'}
                    </Button>
                  </form>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => {
                        setIsResettingPassword(false);
                        setError(null);
                        window.history.replaceState(null, '', window.location.pathname);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      ← Back to Login
                    </Button>
                  </div>
                </div>
              ) : (
                 // Email Entry Form
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Alert className="bg-info/10 border-info/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Account Access:</strong> Password authentication is temporarily disabled. Contact your administrator for access.
                    </AlertDescription>
                  </Alert>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@delorenzopropertygroup.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Processing...' : 'Request Access'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <Button
                      variant="link"
                      onClick={() => navigate('/')}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      ← Back to Home
                    </Button>
                  </div>
                </div>
              )}
            </>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}