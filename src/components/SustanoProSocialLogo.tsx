import React from 'react';

interface SustanoProSocialLogoProps {
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'blue' | 'purple' | 'green' | 'dark' | 'light';
}

const SustanoProSocialLogo: React.FC<SustanoProSocialLogoProps> = ({ 
  backgroundColor,
  textColor,
  size = 'medium',
  variant = 'blue'
}) => {
  const sizeClasses = {
    small: 'w-80 h-32',
    medium: 'w-96 h-40', 
    large: 'w-[500px] h-52'
  };

  const logoSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl'
  };

  const dotSizes = {
    small: 'w-6 h-6 m-1',
    medium: 'w-8 h-8 m-2',
    large: 'w-10 h-10 m-3'
  };

  const variants = {
    blue: {
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      text: 'text-white',
      border: 'border-white'
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-500 to-purple-600', 
      text: 'text-white',
      border: 'border-white'
    },
    green: {
      bg: 'bg-gradient-to-r from-green-500 to-green-600',
      text: 'text-white', 
      border: 'border-white'
    },
    dark: {
      bg: 'bg-gradient-to-r from-gray-800 to-gray-900',
      text: 'text-white',
      border: 'border-white'
    },
    light: {
      bg: 'bg-gradient-to-r from-gray-100 to-gray-200',
      text: 'text-gray-900',
      border: 'border-gray-900'
    }
  };

  const selectedVariant = variants[variant];
  const bgClass = backgroundColor || selectedVariant.bg;
  const textClass = textColor || selectedVariant.text;
  const borderClass = selectedVariant.border;

  return (
    <div className={`${sizeClasses[size]} ${bgClass} flex items-center justify-center gap-4 rounded-lg shadow-lg`}>
      <h1 className={`${textSizes[size]} font-bold ${textClass}`}>
        Sustano Pro
      </h1>
      <div className="relative">
        {/* Distinctive geometric logo - arc with dot */}
        <div className={`${logoSizes[size]} border-4 ${borderClass} rounded-full border-t-transparent border-r-transparent rotate-45 transform`}></div>
        <div className={`absolute inset-0 ${dotSizes[size]} ${textClass.includes('white') ? 'bg-white' : 'bg-gray-900'} rounded-full opacity-80`}></div>
      </div>
    </div>
  );
};

export default SustanoProSocialLogo;