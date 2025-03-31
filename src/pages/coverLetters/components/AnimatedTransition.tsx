
import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  show: boolean;
  animation?: 'fade' | 'slide' | 'blur' | 'scale';
  className?: string;
  delay?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  show,
  animation = 'fade',
  className,
  delay = 0
}) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (show) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Duration of animation
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  if (!shouldRender) return null;

  const animationClasses = {
    fade: show ? 'animate-fade-in' : 'animate-fade-out',
    slide: show ? 'animate-slide-in-right' : 'animate-slide-out-left',
    blur: show ? 'animate-blur-in' : 'animate-fade-out',
    scale: show ? 'animate-scale-in' : 'animate-fade-out'
  };

  return (
    <div 
      className={cn(
        animationClasses[animation],
        className
      )}
      style={{ 
        animationFillMode: 'forwards',
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
