import React from 'react';
import { Globe, Zap } from 'lucide-react';

interface SustanoSphereLogoProps {
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

const SustanoSphereLogo: React.FC<SustanoSphereLogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  showSubtitle = true 
}) => {
  const sizeClasses = {
    sm: { text: 'text-sm', icon: 'h-4 w-4', container: 'gap-1' },
    md: { text: 'text-lg', icon: 'h-5 w-5', container: 'gap-2' },
    lg: { text: 'text-2xl', icon: 'h-7 w-7', container: 'gap-3' },
    xl: { text: 'text-4xl', icon: 'h-10 w-10', container: 'gap-4' }
  };

  const variantClasses = {
    default: {
      text: 'bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent',
      subtitle: 'text-muted-foreground',
      icon1: 'text-primary',
      icon2: 'text-purple-600'
    },
    white: {
      text: 'text-white',
      subtitle: 'text-white/80',
      icon1: 'text-white',
      icon2: 'text-white/90'
    },
    dark: {
      text: 'text-slate-900',
      subtitle: 'text-slate-600',
      icon1: 'text-slate-700',
      icon2: 'text-slate-800'
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  return (
    <div className={`flex items-center ${currentSize.container}`}>
      <div className="relative">
        <Globe className={`${currentSize.icon} ${currentVariant.icon1}`} />
        <Zap className={`absolute -top-1 -right-1 ${currentSize.icon} ${currentVariant.icon2} transform scale-50`} />
      </div>
      <div className="flex flex-col">
        <div className={`font-bold ${currentSize.text} ${currentVariant.text}`}>
          Sustaino-Sphere™
        </div>
        {showSubtitle && (
          <div className={`text-xs ${currentVariant.subtitle} -mt-1`}>
            A Sustaino Pro Service
          </div>
        )}
      </div>
    </div>
  );
};

export default SustanoSphereLogo;