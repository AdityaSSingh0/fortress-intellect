
import { useEffect, useState } from 'react';

// Animation timing (in ms)
export const ANIMATION_TIMING = {
  fast: 300,
  medium: 500,
  slow: 800,
  verySlow: 1200
};

// Hook for staggered animation of lists
export function useStaggeredAnimation(itemCount: number, baseDelay: number = 100) {
  const delays = Array.from({ length: itemCount }, (_, i) => baseDelay * i);
  return delays;
}

// Hook for animated counter
export function useCounterAnimation(
  targetValue: number, 
  duration: number = 1500,
  startOnMount: boolean = true
) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(startOnMount);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(targetValue);
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration, isAnimating]);

  // Function to restart animation
  const animate = () => {
    setCount(0);
    setIsAnimating(true);
  };

  return { count, animate };
}

// Hook for typewriter effect
export function useTypewriterEffect(
  text: string,
  typingSpeed: number = 50,
  startOnMount: boolean = true
) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(startOnMount);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isTyping) return;
    
    let index = 0;
    setDisplayText('');
    setIsDone(false);
    
    const intervalId = setInterval(() => {
      setDisplayText((current) => current + text.charAt(index));
      index++;
      
      if (index >= text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
        setIsDone(true);
      }
    }, typingSpeed);
    
    return () => clearInterval(intervalId);
  }, [text, typingSpeed, isTyping]);

  // Function to restart typing
  const startTyping = () => {
    setIsTyping(true);
  };

  return { displayText, isDone, startTyping };
}

// Hook for fade-in animation
export function useFadeIn(delay: number = 0, duration: number = 500) {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`
  });
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStyle({
        opacity: 1,
        transition: `opacity ${duration}ms ease-in-out`
      });
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [delay, duration]);
  
  return style;
}
