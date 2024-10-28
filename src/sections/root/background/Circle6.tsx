import { Circle } from './Circle';

export const Circle6 = () => {
  return (
    <Circle
      className="top-[32%] left-auto -right-24"
      animate={{
        translateY: [0, 40, 0],
      }}
      transition={{
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};
