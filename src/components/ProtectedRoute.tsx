/**
 * ============================================================================
 * PROPRIETARY AUTHENTICATION COMPONENT
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            <p className="text-white text-sm">Loading Sustano Pro...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // Redirect authenticated users away from auth pages
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
