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

  // Login form state
  const [loginEmail, setLoginEmail] = useState('john@delorenzopropertygroup.com');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('john@delorenzopropertygroup.com');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('John DeLorenzo');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link before logging in.');
        } else {
          setError(error.message);
        }
        return;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const redirectUrl = window.location.href.replace(/\/auth.*$/, '/auth');
      
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName || signupEmail
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please try logging in instead.');
        } else {
          setError(error.message);
        }
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "Please check your email for a confirmation link.",
      });

      // Clear form
      setSignupEmail('john@delorenzopropertygroup.com');
      setSignupPassword('');
      setConfirmPassword('');
      setDisplayName('John DeLorenzo');
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginEmail.trim()) {
      setError('Please enter your email address first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the exact current URL structure to stay in Lovable
      const currentUrl = window.location.href.split('?')[0]; // Remove any query params
      const baseUrl = currentUrl.replace('/auth', '').replace('/#', ''); // Handle both /auth and root
      
      const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
        redirectTo: `${baseUrl}/auth`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for a password reset link. The reset link will keep you in Lovable.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
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
                // Regular Login/Signup Forms
                <div>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {error && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <TabsContent value="login" className="mt-6">
                      <div className="space-y-4">
                        {/* Quick Account Info */}
                        <Alert className="bg-info/10 border-info/20">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Your Account:</strong> john@delorenzopropertygroup.com - Set your password using Sign Up tab if first time
                          </AlertDescription>
                        </Alert>

                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="login-email"
                                type="email"
                                placeholder="Enter your email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="pl-10 pr-10"
                                required
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

                          <div className="flex justify-between items-center">
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              onClick={handleForgotPassword}
                              className="text-sm text-muted-foreground hover:text-foreground p-0"
                            >
                              Forgot Password?
                            </Button>
                          </div>

                          <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                          </Button>
                        </form>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="mt-6">
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="display-name">Display Name (Optional)</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="display-name"
                              type="text"
                              placeholder="Enter your display name"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              className="pl-10"
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirm-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="pl-10"
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>

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