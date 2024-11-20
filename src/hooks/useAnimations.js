// src/hooks/useAnimations.js
import { useAnimation } from 'framer-motion';

export const useAnimations = () => {
  const controls = useAnimation();

  const slideIn = async (direction = 'up') => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    await controls.start({
      opacity: 1,
      ...directions[direction],
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    });
  };

  return { controls, slideIn };
};