import { useAnimation } from '@/hooks';

export const useAnimations = () => {
  const { containerRef: containerRef1, animationClassName: animationClassName1 } = useAnimation({
    direction: 'down',
  });

  const { containerRef: containerRef2, animationClassName: animationClassName2 } = useAnimation({
    variant: 'scale',
  });

  const { containerRef: containerRef3, animationClassName: animationClassName3 } = useAnimation({
    variant: 'scale',
  });

  const { containerRef: containerRef4, animationClassName: animationClassName4 } = useAnimation({
    variant: 'scale',
  });

  return {
    containerRef1,
    animationClassName1,
    containerRef2,
    animationClassName2,
    containerRef3,
    animationClassName3,
    containerRef4,
    animationClassName4,
  };
};
