import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading Spinner Component
 * Reusable loading indicator with different sizes
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
