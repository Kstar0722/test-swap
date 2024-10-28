import { useAnimation } from '@/hooks';

export const useAnimations = () => {
  const { containerRef: containerRef1, animationClassName: animationClassName1 } = useAnimation();

  const { containerRef: containerRef2, animationClassName: animationClassName2 } = useAnimation();

  const { containerRef: containerRef3, animationClassName: animationClassName3 } = useAnimation();

  const { containerRef: containerRef4, animationClassName: animationClassName4 } = useAnimation({
    direction: 'down',
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
