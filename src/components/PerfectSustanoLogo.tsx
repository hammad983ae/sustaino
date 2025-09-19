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
      outerCircle: 'stroke-gray-300',
      innerCircle: 'fill-emerald-500',
      text: 'text-gray-800'
    },
    white: {
      outerCircle: 'stroke-white/60',
      innerCircle: 'fill-white',
      text: 'text-white'
    },
    purple: {
      outerCircle: 'stroke-white/60',
      innerCircle: 'fill-white',
      text: 'text-white'
    },
    dark: {
      outerCircle: 'stroke-gray-600',
      innerCircle: 'fill-gray-800',
      text: 'text-gray-800'
    },
    emerald: {
      outerCircle: 'stroke-white/60',
      innerCircle: 'fill-white',
      text: 'text-white'
    },
    blue: {
      outerCircle: 'stroke-white/60', 
      innerCircle: 'fill-white',
      text: 'text-white'
    }
  };

  const config = sizeConfig[size];
  const colors = colorConfig[variant];

  const logoSvg = (
    <div className={`${config.container} ${className} flex items-center justify-center`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main circle with crescent cutout */}
        <circle
          cx="50"
          cy="50"
          r="40"
          className={colors.innerCircle}
        />
        
        {/* Crescent cutout */}
        <circle
          cx="65"
          cy="35"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="50"
          className={variant === 'white' || variant === 'purple' || variant === 'emerald' || variant === 'blue' ? 'stroke-transparent' : 'stroke-white'}
          mask="url(#cutout)"
        />
        
        {/* Create mask for crescent effect */}
        <defs>
          <mask id="cutout">
            <rect width="100%" height="100%" fill="white"/>
            <circle cx="65" cy="35" r="25" fill="black"/>
          </mask>
        </defs>
        
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="currentColor"
          className={colors.innerCircle}
          mask="url(#cutout)"
        />
      </svg>
    </div>
  );

  if (!showText) {
    return logoSvg;
  }

  return (
    <div className={`flex ${config.textContainer} ${config.spacing}`}>
      <div className={textPosition === 'bottom' ? 'text-center' : 'flex items-center gap-4'}>
        <div className={`font-bold ${config.text} ${colors.text} tracking-wide`}>
          Sustaino Pro
        </div>
        {logoSvg}
      </div>
      {size !== 'sm' && textPosition === 'bottom' && (
        <div className={`text-xs ${colors.text} opacity-80 text-center mt-2`}>
          Property Intelligence
        </div>
      )}
    </div>
  );
};

export default PerfectSustanoLogo;