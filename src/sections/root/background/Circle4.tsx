import { Circle } from './Circle';

export const Circle4 = () => {
  return (
    <Circle
      className="hidden lg:block top-[44%] left-[5%] w-60 h-60"
      animate={{
        translateX: [0, 120, 0],
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
