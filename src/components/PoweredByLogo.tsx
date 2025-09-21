import React from 'react';
import ThunderboltIcon from './ThunderboltIcon';

interface PoweredByLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark' | 'gradient';
  showIcon?: boolean;
  className?: string;
}

const PoweredByLogo: React.FC<PoweredByLogoProps> = ({
  size = 'md',
  variant = 'default',
  showIcon = true,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { 
      container: 'text-sm gap-2',
      thunderbolt: 'w-4 h-4',
      powered: 'text-xs',
      brand: 'text-sm font-semibold'
    },
    md: { 
      container: 'text-base gap-3',
      thunderbolt: 'w-5 h-5',
      powered: 'text-sm',
      brand: 'text-lg font-bold'
    },
    lg: { 
      container: 'text-lg gap-4',
      thunderbolt: 'w-6 h-6',
      powered: 'text-base',
      brand: 'text-xl font-bold'
    },
    xl: { 
      container: 'text-xl gap-5',
      thunderbolt: 'w-8 h-8',
      powered: 'text-lg',
      brand: 'text-2xl font-bold'
    }
  };

  // Color variants
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
    gradient: {
      powered: 'text-gray-600',
      brand: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
      container: 'text-gray-800'
    }
  };

  const config = sizeConfig[size];
  const colors = colorConfig[variant];

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      {showIcon && (
        <ThunderboltIcon className={config.thunderbolt} />
      )}
      <div className="flex flex-col">
        <div className={`${config.powered} ${colors.powered} uppercase tracking-wider`}>
          Powered by
        </div>
        <div className={`${config.brand} ${colors.brand}`}>
          DeLorenzo Property Group
        </div>
      </div>
    </div>
  );
};

export default PoweredByLogo;