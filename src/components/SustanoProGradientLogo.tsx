import React from 'react';

interface SustanoProGradientLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant?: 'blue-gradient' | 'purple-gradient' | 'white' | 'dark';
  showSubtext?: boolean;
  className?: string;
}

const SustanoProGradientLogo: React.FC<SustanoProGradientLogoProps> = ({
  size = 'md',
  variant = 'blue-gradient',
  showSubtext = false,
  className = ''
}) => {
  const sizeConfig = {
    sm: {
      container: 'text-2xl gap-3',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      subtext: 'text-xs'
    },
    md: {
      container: 'text-3xl gap-4',
      icon: 'w-10 h-10',
      text: 'text-3xl',
      subtext: 'text-sm'
    },
    lg: {
      container: 'text-4xl gap-5',
      icon: 'w-12 h-12',
      text: 'text-4xl',
      subtext: 'text-base'
    },
    xl: {
      container: 'text-5xl gap-6',
      icon: 'w-16 h-16',
      text: 'text-5xl',
      subtext: 'text-lg'
    },
    xxl: {
      container: 'text-6xl gap-8',
      icon: 'w-20 h-20',
      text: 'text-6xl',
      subtext: 'text-xl'
    }
  };

  const variantConfig = {
    'blue-gradient': {
      container: 'bg-gradient-to-r from-blue-500 to-blue-600',
      text: 'text-white',
      icon: 'border-white',
      subtext: 'text-white/80'
    },
    'purple-gradient': {
      container: 'bg-gradient-to-r from-purple-500 to-purple-600',
      text: 'text-white',
      icon: 'border-white',
      subtext: 'text-white/80'
    },
    white: {
      container: 'bg-white',
      text: 'text-gray-900',
      icon: 'border-gray-900',
      subtext: 'text-gray-600'
    },
    dark: {
      container: 'bg-gradient-to-r from-gray-800 to-gray-900',
      text: 'text-white',
      icon: 'border-white',
      subtext: 'text-white/80'
    }
  };

  const config = sizeConfig[size];
  const colors = variantConfig[variant];

  return (
    <div className={`${colors.container} flex items-center justify-center ${config.container} px-8 py-6 rounded-lg shadow-lg ${className}`}>
      <h1 className={`${config.text} font-bold ${colors.text}`}>
        Sustano Pro
      </h1>
      <div className="relative">
        {/* Distinctive geometric logo - arc with dot */}
        <div className={`${config.icon} border-4 ${colors.icon} rounded-full border-t-transparent border-r-transparent rotate-45 transform`}></div>
        <div className={`absolute inset-0 ${config.icon === 'w-8 h-8' ? 'w-6 h-6 m-1' : config.icon === 'w-10 h-10' ? 'w-8 h-8 m-1' : config.icon === 'w-12 h-12' ? 'w-8 h-8 m-2' : config.icon === 'w-16 h-16' ? 'w-10 h-10 m-3' : 'w-12 h-12 m-4'} ${colors.text.includes('white') ? 'bg-white' : 'bg-gray-900'} rounded-full opacity-80`}></div>
      </div>
      {showSubtext && (
        <div className={`${config.subtext} ${colors.subtext} ml-2`}>
          AI Assisted Property Valuation and ESG Assessment Technology
        </div>
      )}
    </div>
  );
};

export default SustanoProGradientLogo;