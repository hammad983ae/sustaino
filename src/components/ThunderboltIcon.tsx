import React from 'react';

const ThunderboltIcon = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="thunderbolt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path 
        d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" 
        stroke="url(#thunderbolt-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
        className="drop-shadow-sm"
      />
    </svg>
  );
};

export default ThunderboltIcon;