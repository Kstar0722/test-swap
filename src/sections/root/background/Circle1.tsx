import { Circle } from './Circle';

export const Circle1 = () => {
  return (
    <Circle
      className="top-10 -left-10"
      animate={{
        translateY: [0, 18, 0],
      }}
      transition={{
        duration: 5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};
