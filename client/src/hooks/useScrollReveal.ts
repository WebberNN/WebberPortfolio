import { useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

export const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  return { ref, controls, isInView };
};
