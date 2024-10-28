import { Circle } from './Circle';

export const Circle7 = () => {
  return (
    <Circle
      className="hidden lg:block top-auto left-[35%] -bottom-12"
      animate={{
        translateX: [0, 30, 0],
      }}
      transition={{
        duration: 10,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};
