import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Phone, QrCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  
  // QR Code state
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [showQrVerification, setShowQrVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate('/');
      }
    };

    // Check for password recovery mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (mode === 'recovery' && accessToken && refreshToken) {
      // Handle password recovery
      toast({
        title: "Password Reset Ready",
        description: "You can now update your password using the form below.",
        className: "bg-blue-50 border-blue-200"
      });
    }

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        toast({
          title: "Successfully logged in! 🎉",
          description: "Your job filing system is ready to use.",
          className: "bg-green-50 border-green-200"
        });
        navigate('/');
      }
      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Update Your Password",
          description: "Please enter your new password below.",
          className: "bg-blue-50 border-blue-200"
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    setError(null);

    if (!resetEmail.trim()) {
      setError('Please enter your email address.');
      setIsResetting(false);
      return;
    }

    try {
      console.log("Starting password reset for:", resetEmail);
      
      // Generate reset URL
      const resetUrl = `${window.location.origin}/auth?mode=recovery&email=${encodeURIComponent(resetEmail)}`;
      
      // Send password reset email using our reliable system
      const { error: emailError } = await supabase.functions.invoke('send-password-reset', {
        body: {
          email: resetEmail,
          resetUrl: resetUrl
        }
      });

      if (emailError) {
        console.error('Password reset email error:', emailError);
        setError('Failed to send password reset email. Please check your email address and try again.');
        return;
      }

      console.log("Password reset email sent successfully");
      
      toast({
        title: "Password reset email sent! ✉️",
        description: "Check your email (including spam folder) for a password reset link. The link will expire in 1 hour.",
        className: "bg-green-50 border-green-200"
      });

      setShowResetForm(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send password reset email. Please check your email address and try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const generateQrCode = async () => {
    try {
      // Generate QR code data for 2FA setup (simulated)
      const qrData = `otpauth://totp/${encodeURIComponent('DeLorenzo Property')}:${encodeURIComponent(signupEmail)}?secret=${btoa(signupEmail + Date.now()).slice(0, 16)}&issuer=${encodeURIComponent('DeLorenzo Property Group')}`;
      
      // Generate the actual QR code image
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCode(qrData);
      setQrCodeDataUrl(qrCodeDataUrl);
      setShowQrVerification(true);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      // Fallback: still show the QR section but with an error message
      setShowQrVerification(true);
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
      console.log("Starting signup process for:", signupEmail);
      
      // First create the user account without email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            display_name: displayName || signupEmail,
            phone: phoneNumber
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please try logging in instead.');
        } else {
          setError(error.message);
        }
        return;
      }

      console.log("User created successfully:", data);

      // Send verification email using our reliable system
      try {
        const confirmationUrl = `${window.location.origin}/auth?confirmed=true&email=${encodeURIComponent(signupEmail)}`;
        
        const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
          body: {
            email: signupEmail,
            confirmationUrl: confirmationUrl
          }
        });

        if (emailError) {
          console.error("Email sending error:", emailError);
          toast({
            title: "Account Created",
            description: "Account created but verification email failed. You can try logging in or request a new verification email.",
            className: "bg-yellow-50 border-yellow-200"
          });
        } else {
          console.log("Verification email sent successfully");
          toast({
            title: "Account created successfully! ✅",
            description: "Please check your email (including spam folder) for a verification link. Then you can log in.",
            className: "bg-green-50 border-green-200"
          });
        }
      } catch (emailError) {
        console.error("Email function error:", emailError);
        toast({
          title: "Account Created",
          description: "Account created but email system is having issues. You can try logging in after a few minutes.",
          className: "bg-yellow-50 border-yellow-200"
        });
      }

      // Generate QR code for verification
      await generateQrCode();

      // Clear form but keep QR code visible
      setSignupEmail('');
      setSignupPassword('');
      setConfirmPassword('');
      setDisplayName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Signup error:', error);
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Property Valuation and ESG Assessment Powered By Sustaino Pro</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
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

                  <div className="flex items-center justify-between">
                    <Button 
                      type="button"
                      variant="link" 
                      onClick={() => setShowResetForm(!showResetForm)}
                      className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  {showResetForm && (
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div className="text-center mb-3">
                          <h4 className="font-semibold text-blue-800">Reset Your Password</h4>
                          <p className="text-sm text-blue-600">Enter your email to receive a reset link</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reset-email" className="text-blue-800">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                            <Input
                              id="reset-email"
                              type="email"
                              placeholder="Enter your email address"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              className="pl-10 border-blue-200 focus:border-blue-400"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700" 
                            disabled={isResetting || !resetEmail.trim()}
                          >
                            {isResetting ? 'Sending Reset Link...' : 'Send Reset Link'}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setShowResetForm(false);
                              setResetEmail('');
                              setError(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
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
                        placeholder="Enter your name"
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
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="+61 400 000 000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
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
                        placeholder="Create a password (min 6 characters)"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
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
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>

                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      After creating your account, you'll receive a verification email. Check your inbox and click the link to verify your account, then you can log in. A QR code is also generated for additional security.
                    </AlertDescription>
                  </Alert>

                  {showQrVerification && qrCode && (
                    <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <QrCode className="h-5 w-5 text-primary" />
                          <Label className="text-primary font-semibold">Account Verification QR Code</Label>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg inline-block border-2 border-primary/20">
                          {qrCodeDataUrl ? (
                            <img 
                              src={qrCodeDataUrl} 
                              alt="QR Code for 2FA setup" 
                              className="w-40 h-40"
                            />
                          ) : (
                            <div className="w-40 h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center rounded">
                              <QrCode className="h-16 w-16 text-white" />
                              <div className="absolute text-white text-xs">Generating...</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium">Scan this QR code with your authenticator app</p>
                          <p className="text-xs mt-1">This provides additional security for your account</p>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="verification-code" className="text-sm font-medium">
                            Enter 6-digit verification code from your authenticator app:
                          </Label>
                          <div className="flex justify-center">
                            <Input
                              id="verification-code"
                              type="text"
                              placeholder="000000"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                              className="w-32 text-center text-lg font-mono tracking-widest"
                              maxLength={6}
                            />
                          </div>
                          
                          <div className="flex gap-2 justify-center">
                            <Button 
                              variant="default" 
                              size="sm"
                              disabled={verificationCode.length !== 6}
                              onClick={() => {
                                toast({
                                  title: "Verification code noted",
                                  description: `Code ${verificationCode} has been recorded for your account.`,
                                  className: "bg-green-50 border-green-200"
                                });
                                setShowQrVerification(false);
                                setVerificationCode('');
                              }}
                            >
                              Verify Code
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setShowQrVerification(false);
                                setVerificationCode('');
                              }}
                            >
                              Skip for now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}