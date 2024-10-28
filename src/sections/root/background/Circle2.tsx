import { Circle } from './Circle';

export const Circle2 = () => {
  return (
    <Circle
      className="hidden lg:block top-[13%] left-[28%] w-60 h-60"
      animate={{
        translateX: [0, 24, 0],
      }}
      transition={{
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};
