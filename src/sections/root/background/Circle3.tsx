import { Circle } from './Circle';

export const Circle3 = () => {
  return (
    <Circle
      className="hidden lg:block left-auto right-[10%] w-80 h-80"
      animate={{
        translateY: [0, 60, 0],
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
