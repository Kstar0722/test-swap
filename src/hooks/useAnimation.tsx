'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'slide' | 'scale';

type UseSectionAnimationsProps = {
  variant?: Variant;
  direction?: 'up' | 'down' | 'left' | 'right';
  animationClassName?: string;
  once?: boolean;
};

export const useAnimation = (payload?: UseSectionAnimationsProps) => {
  const {
    variant = 'slide',
    direction = 'up',
    animationClassName: _animationClassName = '',
    once = true,
  } = payload || {};

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once });

  const slideClassName =
    direction === 'up'
      ? twMerge('translate-y-12', _animationClassName)
      : direction === 'down'
        ? twMerge('-translate-y-12', _animationClassName)
        : direction === 'left'
          ? twMerge('translate-x-12', _animationClassName)
          : direction === 'right'
            ? twMerge('-translate-x-12', _animationClassName)
            : '';

  const scaleClassName = twMerge('scale-75', _animationClassName);

  const getVariantClass = (_variant: Variant) => {
    switch (_variant) {
      case 'slide': {
        return slideClassName;
      }

      case 'scale': {
        return scaleClassName;
      }

      default: {
        return '';
      }
    }
  };

  const animationClassName = twMerge(
    'transition-all duration-700',
    isInView ? 'opacity-100' : twMerge('opacity-0', getVariantClass(variant)),
  );

  return { containerRef, animationClassName, isInView };
};
