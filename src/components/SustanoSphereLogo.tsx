import React from 'react';
import { Globe } from 'lucide-react';

interface SustanoSphereLogoProps {
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showText?: boolean;
}

const SustanoSphereLogo: React.FC<SustanoSphereLogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  showSubtitle = true,
  showText = true
}) => {
  const sizeClasses = {
    sm: { text: 'text-lg', subtitle: 'text-xs', icon: 'h-6 w-6', container: 'gap-2' },
    md: { text: 'text-2xl', subtitle: 'text-sm', icon: 'h-8 w-8', container: 'gap-3' },
    lg: { text: 'text-3xl', subtitle: 'text-base', icon: 'h-12 w-12', container: 'gap-4' },
    xl: { text: 'text-4xl', subtitle: 'text-lg', icon: 'h-16 w-16', container: 'gap-5' }
  };

  const variantClasses = {
    default: {
      icon: 'bg-gradient-to-br from-green-400 to-purple-600 text-white',
      text: 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent',
      subtitle: 'text-muted-foreground'
    },
    white: {
      icon: 'bg-white/90 text-slate-700',
      text: 'text-white',
      subtitle: 'text-white/80'
    },
    dark: {
      icon: 'bg-slate-700 text-white',
      text: 'text-slate-900',
      subtitle: 'text-slate-600'
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  if (!showText) {
    return (
      <div className={`${currentSize.icon} ${currentVariant.icon} rounded-full p-2 flex items-center justify-center shadow-lg`}>
        <Globe className="h-full w-full" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${currentSize.container}`}>
      <div className={`${currentSize.icon} ${currentVariant.icon} rounded-full p-2 flex items-center justify-center shadow-lg`}>
        <Globe className="h-full w-full" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col">
        <div className={`font-bold ${currentSize.text} ${currentVariant.text}`}>
          Sustaino Sphere™
        </div>
        {showSubtitle && (
          <div className={`${currentSize.subtitle} ${currentVariant.subtitle}`}>
            A Sustaino Pro Service
          </div>
        )}
      </div>
    </div>
  );
};

export default SustanoSphereLogo;