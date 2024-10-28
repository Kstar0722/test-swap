import { Circle } from './Circle';

export const Circle5 = () => {
  return (
    <Circle
      className="hidden lg:block top-[55%] left-auto right-[30%]"
      animate={{
        translateX: [0, 100, 0],
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
