import React from 'react';

interface PerfectSustanoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'purple' | 'dark' | 'emerald' | 'blue';
  showText?: boolean;
  textPosition?: 'right' | 'bottom';
  className?: string;
}

const PerfectSustanoLogo: React.FC<PerfectSustanoLogoProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
  textPosition = 'right',
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { 
      container: 'w-16 h-16', 
      text: 'text-lg', 
      spacing: textPosition === 'right' ? 'gap-3' : 'gap-2',
      textContainer: textPosition === 'right' ? 'flex-row items-center' : 'flex-col items-center'
    },
    md: { 
      container: 'w-24 h-24', 
      text: 'text-2xl', 
      spacing: textPosition === 'right' ? 'gap-4' : 'gap-3',
      textContainer: textPosition === 'right' ? 'flex-row items-center' : 'flex-col items-center'
    },
    lg: { 
      container: 'w-32 h-32', 
      text: 'text-3xl', 
      spacing: textPosition === 'right' ? 'gap-5' : 'gap-4',
      textContainer: textPosition === 'right' ? 'flex-row items-center' : 'flex-col items-center'
    },
    xl: { 
      container: 'w-40 h-40', 
      text: 'text-4xl', 
      spacing: textPosition === 'right' ? 'gap-6' : 'gap-5',
      textContainer: textPosition === 'right' ? 'flex-row items-center' : 'flex-col items-center'
    }
  };

  // Color variants
  const colorConfig = {
    default: {
      outerCircle: 'stroke-gray-800',
      innerCircle: 'fill-black',
      text: 'text-black'
    },
    white: {
      outerCircle: 'stroke-white/60',
      innerCircle: 'fill-white',
      text: 'text-white'
    },
    purple: {
      outerCircle: 'stroke-black',
      innerCircle: 'fill-black',
      text: 'text-black'
    },
    dark: {
      outerCircle: 'stroke-black',
      innerCircle: 'fill-black',
      text: 'text-black'
    },
    emerald: {
      outerCircle: 'stroke-black',
      innerCircle: 'fill-black',
      text: 'text-black'
    },
    blue: {
      outerCircle: 'stroke-black', 
      innerCircle: 'fill-black',
      text: 'text-black'
    }
  };

  const config = sizeConfig[size];
  const colors = colorConfig[variant];

  const logoSvg = (
    <div className={`${config.container} flex items-center justify-center`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large circle outline */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={variant === 'white' ? 'white' : variant === 'dark' ? '#1f2937' : '#000000'}
          strokeWidth="6"
        />
        {/* Smaller filled circle in lower-right area */}
        <circle
          cx="65"
          cy="65"
          r="8"
          fill={variant === 'white' ? 'white' : variant === 'dark' ? '#1f2937' : '#000000'}
        />
      </svg>
    </div>
  );

  if (!showText) {
    return logoSvg;
  }

  return (
    <div className={`flex ${config.textContainer} ${config.spacing}`}>
      <div className={`font-bold ${config.text} ${colors.text} tracking-wide`}>
        Sustaino Pro
      </div>
      {logoSvg}
    </div>
  );
};

export default PerfectSustanoLogo;