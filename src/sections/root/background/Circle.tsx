'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type CircleProps = PropsWithChildren<{
  className?: string;
  animate?: any;
  transition?: any;
}>;

export const Circle = ({ children, className: _className, animate, transition }: CircleProps) => {
  const baseClassName = 'bg-pink-3 rounded-full w-40 h-40 fixed top-0 left-0 -z-10';

  const className = twMerge(baseClassName, _className);

  return (
    <motion.div
      animate={
        animate || {
          translateY: [0, 24, 0],
        }
      }
      transition={
        transition || {
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};
