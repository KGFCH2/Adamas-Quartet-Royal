
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Use HTMLMotionProps<"button"> to properly inherit motion-specific prop types and standard button attributes
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'tricolor';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  // Overriding children to ensure it's a standard ReactNode for internal rendering
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-[0.15em] uppercase text-[10px] overflow-hidden group indian-ripple";
  
  const variants = {
    primary: "bg-saffron-500 text-white hover:bg-saffron-600 shadow-[0_10px_20px_rgba(255,153,51,0.2)] border border-saffron-400/20",
    secondary: "bg-indiaGreen-500 text-white hover:bg-indiaGreen-600 shadow-[0_10px_20px_rgba(19,136,8,0.2)] border border-indiaGreen-400/20",
    outline: "border-2 border-chakra-800 text-chakra-800 hover:bg-chakra-900 hover:text-white dark:border-saffron-500/50 dark:text-saffron-400 dark:hover:bg-saffron-500 dark:hover:text-white",
    ghost: "text-chakra-800 dark:text-gray-300 hover:bg-saffron-500/10 dark:hover:bg-saffron-500/10",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm border border-red-500/20",
    tricolor: "bg-white text-chakra-900 border-none shadow-2xl hover:text-saffron-600",
  };

  const sizes = {
    sm: "h-10 px-6",
    md: "h-12 px-8",
    lg: "h-16 px-12 text-[11px]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Paisley Motif appearing on hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none flex items-center justify-center">
        <motion.img 
          src="https://www.transparenttextures.com/patterns/mandala.png" 
          className="w-full h-full object-cover scale-150"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Tricolor Indicator Line for Tricolor variant */}
      {variant === 'tricolor' && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex opacity-30 group-hover:opacity-100 transition-opacity">
          <div className="flex-1 bg-saffron-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-indiaGreen-500"></div>
        </div>
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (children as React.ReactNode)}
      </span>
    </motion.button>
  );
};
