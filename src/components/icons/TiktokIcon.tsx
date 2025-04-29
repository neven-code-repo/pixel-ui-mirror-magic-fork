
import React from 'react';

interface TiktokIconProps {
  size?: number;
  color?: string;
  className?: string; // Added className prop to the interface
}

export const TiktokIcon: React.FC<TiktokIconProps> = ({ size = 24, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
};
