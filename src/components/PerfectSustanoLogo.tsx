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
    <div className="w-16 h-16 flex items-center justify-center ml-4">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crescent moon shape - exactly like reference */}
        <defs>
          <mask id="crescentMask">
            <rect width="100%" height="100%" fill="white"/>
            <circle cx="75" cy="25" r="35" fill="black"/>
          </mask>
        </defs>
        
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="white"
          mask="url(#crescentMask)"
        />
      </svg>
    </div>
  );

  if (!showText) {
    return logoSvg;
  }

  return (
    <div className="flex items-center">
      <div className="text-6xl font-bold text-white tracking-wide">
        Sustaino Pro
      </div>
      {logoSvg}
    </div>
  );
};

export default PerfectSustanoLogo;