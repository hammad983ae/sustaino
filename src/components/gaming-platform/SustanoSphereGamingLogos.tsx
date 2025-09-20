/**
 * ============================================================================
 * SUSTANO-SPHERE™ GAMING PLATFORM LOGOS & BRANDING
 * Logo Components for Gaming Platform Integration
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React from 'react';
import { Leaf, Globe, Star, Zap, Shield, Award, Gamepad2 } from 'lucide-react';

// Gaming Platform Logo Variants
export const SustanoSphereGamingLogo = ({ 
  size = 'md', 
  variant = 'default',
  showText = true,
  animated = true 
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'compact' | 'icon-only' | 'gaming';
  showText?: boolean;
  animated?: boolean;
}) => {
  const sizeConfig = {
    sm: { icon: 'h-8 w-8', text: 'text-lg', container: 'gap-2' },
    md: { icon: 'h-12 w-12', text: 'text-2xl', container: 'gap-3' },
    lg: { icon: 'h-16 w-16', text: 'text-4xl', container: 'gap-4' },
    xl: { icon: 'h-20 w-20', text: 'text-6xl', container: 'gap-6' }
  };

  const config = sizeConfig[size];

  if (variant === 'icon-only') {
    return (
      <div className={`relative ${animated ? 'animate-float' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-600/40 rounded-full blur-lg"></div>
        <div className={`relative ${config.icon} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg`}>
          <Leaf className={`${config.icon.replace('h-', 'h-').replace('w-', 'w-').replace(/\d+/, (n) => Math.floor(parseInt(n) * 0.6).toString())} text-white`} />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${config.container}`}>
        <div className="relative">
          <div className={`${config.icon} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center`}>
            <Leaf className={`${config.icon.replace(/\d+/, (n) => Math.floor(parseInt(n) * 0.6).toString())} text-white`} />
          </div>
        </div>
        {showText && (
          <span className={`${config.text} font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent`}>
            Sustano-Sphere™
          </span>
        )}
      </div>
    );
  }

  if (variant === 'gaming') {
    return (
      <div className={`flex items-center ${config.container} ${animated ? 'animate-gaming-pulse' : ''}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 blur-xl rounded-full"></div>
          <div className={`relative ${config.icon} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-2xl`}>
            <Gamepad2 className={`${config.icon.replace(/\d+/, (n) => Math.floor(parseInt(n) * 0.6).toString())} text-white`} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Star className="h-3 w-3 text-white" />
          </div>
        </div>
        {showText && (
          <div>
            <div className={`${config.text} font-black gaming-text-gradient`}>
              Sustano-Sphere™
            </div>
            <div className="text-sm text-green-400 font-semibold">Gaming Edition</div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center ${config.container}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-600/40 rounded-full blur-lg"></div>
        <div className={`relative ${config.icon} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center ${animated ? 'animate-float' : ''}`}>
          <Leaf className={`${config.icon.replace(/\d+/, (n) => Math.floor(parseInt(n) * 0.6).toString())} text-white drop-shadow-lg`} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-xl rounded-lg"></div>
        <div className="relative">
          {showText && (
            <h1 className={`${config.text} font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent ${animated ? 'animate-glow-pulse' : ''}`}>
              Sustano-Sphere™
            </h1>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-green-500/40 rounded-full blur-lg"></div>
        <div className={`relative ${config.icon} bg-gradient-to-br from-teal-600 to-green-500 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center ${animated ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }}>
          <Globe className={`${config.icon.replace(/\d+/, (n) => Math.floor(parseInt(n) * 0.6).toString())} text-white drop-shadow-lg`} />
        </div>
      </div>
    </div>
  );
};

// Gaming Platform Powered By Logo
export const SustanoSpherePoweredBy = ({ 
  size = 'md',
  variant = 'default',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'dark' | 'gaming';
  className?: string;
}) => {
  const sizeConfig = {
    sm: { 
      container: 'text-sm gap-2',
      icon: 'w-4 h-4',
      powered: 'text-xs',
      brand: 'text-sm font-semibold'
    },
    md: { 
      container: 'text-base gap-3',
      icon: 'w-5 h-5',
      powered: 'text-sm',
      brand: 'text-lg font-bold'
    },
    lg: { 
      container: 'text-lg gap-4',
      icon: 'w-6 h-6',
      powered: 'text-base',
      brand: 'text-xl font-bold'
    }
  };

  const colorConfig = {
    default: {
      powered: 'text-gray-600',
      brand: 'text-gray-900',
      container: 'text-gray-800'
    },
    white: {
      powered: 'text-white/80',
      brand: 'text-white',
      container: 'text-white'
    },
    dark: {
      powered: 'text-gray-400',
      brand: 'text-gray-800',
      container: 'text-gray-800'
    },
    gaming: {
      powered: 'text-green-400',
      brand: 'gaming-text-gradient',
      container: 'text-green-300'
    }
  };

  const config = sizeConfig[size];
  const colors = colorConfig[variant];

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      <div className={`${config.icon} relative`}>
        {variant === 'gaming' ? (
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/20 blur-sm rounded-full"></div>
            <Zap className={`${config.icon} text-green-400 relative`} />
          </div>
        ) : (
          <Zap className={`${config.icon} text-green-500`} />
        )}
      </div>
      <div className="flex flex-col">
        <div className={`${config.powered} ${colors.powered} uppercase tracking-wider`}>
          Powered by
        </div>
        <div className={`${config.brand} ${colors.brand}`}>
          Sustano-Sphere™
        </div>
      </div>
    </div>
  );
};

// Gaming Platform Icon Set
export const SustanoSphereIcons = {
  Primary: ({ size = "h-6 w-6", className = "" }) => (
    <Leaf className={`${size} text-green-500 ${className}`} />
  ),
  
  Secondary: ({ size = "h-6 w-6", className = "" }) => (
    <Globe className={`${size} text-blue-500 ${className}`} />
  ),
  
  ESG: ({ size = "h-6 w-6", className = "" }) => (
    <Shield className={`${size} text-emerald-500 ${className}`} />
  ),
  
  Auction: ({ size = "h-6 w-6", className = "" }) => (
    <Zap className={`${size} text-purple-500 ${className}`} />
  ),
  
  Gaming: ({ size = "h-6 w-6", className = "" }) => (
    <Gamepad2 className={`${size} text-orange-500 ${className}`} />
  ),
  
  Award: ({ size = "h-6 w-6", className = "" }) => (
    <Award className={`${size} text-yellow-500 ${className}`} />
  ),
  
  Star: ({ size = "h-6 w-6", className = "" }) => (
    <Star className={`${size} text-amber-500 ${className}`} />
  )
};

// Gaming Platform Badge Components
export const SustanoSphereBadge = ({ 
  type = 'esg',
  value = '',
  animated = true 
}: {
  type: 'esg' | 'live' | 'gaming' | 'certified' | 'ai';
  value?: string;
  animated?: boolean;
}) => {
  const badgeConfig = {
    esg: {
      className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      icon: <Leaf className="h-4 w-4" />,
      label: value || 'ESG'
    },
    live: {
      className: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
      icon: <Zap className="h-4 w-4" />,
      label: value || 'LIVE'
    },
    gaming: {
      className: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
      icon: <Gamepad2 className="h-4 w-4" />,
      label: value || 'GAMING'
    },
    certified: {
      className: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      icon: <Award className="h-4 w-4" />,
      label: value || 'CERTIFIED'
    },
    ai: {
      className: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
      icon: <Zap className="h-4 w-4" />,
      label: value || 'AI'
    }
  };

  const config = badgeConfig[type];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${config.className} ${animated ? 'animate-pulse' : ''}`}>
      {config.icon}
      {config.label}
    </div>
  );
};

export default {
  SustanoSphereGamingLogo,
  SustanoSpherePoweredBy,
  SustanoSphereIcons,
  SustanoSphereBadge
};