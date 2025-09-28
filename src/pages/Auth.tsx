/**
 * ============================================================================
 * PROPRIETARY AUTHENTICATION PLATFORM
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Leaf,
  Award,
  Users,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { login, signup, logout } = useAuth();

  const validateForm = (type: 'login' | 'signup' | 'reset') => {
    const newErrors: Record<string, string> = {};

    if (type === 'login') {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    if (type === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.company) newErrors.company = 'Company is required';
    }

    if (type === 'reset') {
      if (!formData.email) newErrors.email = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('login')) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password, true);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('signup')) return;

    setLoading(true);
    try {
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        phone: formData.phone
      };
      
      console.log('Signup data being sent:', signupData);
      
      await signup(signupData);

      toast.success('Account created! Please check your email to verify your account.');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('reset')) return;

    setLoading(true);
    try {
      // Note: forgotPassword is not in the auth context, so we'll use apiClient directly
      const { apiClient } = await import('@/lib/api');
      await apiClient.forgotPassword(formData.email);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-purple-400/30 animate-float">
          <BarChart3 size={32} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-blue-400/30 animate-float" style={{ animationDelay: '1s' }}>
          <TrendingUp size={28} />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-emerald-400/30 animate-float" style={{ animationDelay: '2s' }}>
          <Leaf size={24} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-purple-400/30 animate-float" style={{ animationDelay: '3s' }}>
          <Zap size={30} />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Sustano Pro</h1>
                  <p className="text-purple-300 text-sm">ICV Platform</p>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Revolutionary
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Property Intelligence</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
                AI-powered property valuation with ESG integration, blockchain technology, and comprehensive market analysis.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">ESG Integration</h3>
                  <p className="text-gray-400 text-sm">Sustainability scoring</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Analytics</h3>
                  <p className="text-gray-400 text-sm">Advanced insights</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Blockchain Ready</h3>
                  <p className="text-gray-400 text-sm">Secure transactions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Patent Protected</h3>
                  <p className="text-gray-400 text-sm">IP secured</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Security
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Globe className="w-3 h-3 mr-1" />
                Global Platform
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Users className="w-3 h-3 mr-1" />
                10,000+ Users
              </Badge>
            </div>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-300">
                  Sign in to access your Sustano Pro dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                    <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">Sign Up</TabsTrigger>
                    <TabsTrigger value="reset" className="text-white data-[state=active]:bg-white/20">Reset</TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-white">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remember"
                            className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-400"
                          />
                          <Label htmlFor="remember" className="text-gray-300 text-sm">Remember me</Label>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('reset')}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2.5"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Sign In
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full bg-white/20" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                        Twitter
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Signup Form */}
                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-firstName" className="text-white">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                              required
                            />
                          </div>
                          {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-lastName" className="text-white">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                              required
                            />
                          </div>
                          {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-white">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-company" className="text-white">Company</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-company"
                            type="text"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                        </div>
                        {errors.company && <p className="text-red-400 text-sm">{errors.company}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-white">Password</Label>
                        <p className="text-xs text-gray-400">Must be at least 8 characters with uppercase, lowercase, and number</p>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                        {formData.password && !errors.password && (
                          <div className="text-xs text-gray-400 mt-1">
                            Password strength: {formData.password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 
                              <span className="text-green-400">Strong</span> : 
                              <span className="text-yellow-400">Weak</span>}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirmPassword" className="text-white">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-400"
                          required
                        />
                        <Label htmlFor="terms" className="text-gray-300 text-sm">
                          I agree to the{' '}
                          <Link to="/terms-of-service" className="text-purple-400 hover:text-purple-300">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2.5"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Password Reset Form */}
                  <TabsContent value="reset" className="space-y-4 mt-6">
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-300">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <Label htmlFor="reset-email" className="text-white">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                            required
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2.5"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Send Reset Link
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Back to login
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Demo Access */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-3">Want to explore first?</p>
              <Link to="/client-demo">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-xs">
          © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Patent Pending • IP Protected • Trademark © • Copyright Protected
        </p>
      </div>
    </div>
  );
};

export default Auth;
